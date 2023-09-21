import { Distance, Finger, FingerCurl, FingerDirection, FingerSpacing, HandDirection, HandPosition, MovementDirection, ProfundityDirection } from './FingerDescription';
import videoConfig from './videoConfig';

export default class FingerPoseEstimator {

  constructor(options) {
    this.avgProfundity = { Left: [], Right: [] };
    this.prevCoordinates = { Left: [], Right: [] };
    this.maxPrevCoordinates = 5;
    this.movementDirection = 0;
    this.handPosition = 0;

    this.firstHand = null;
    this.secondHand = null;
    this.threshold = Math.min(videoConfig.width, videoConfig.height) * 0.15

    this.options = {
      ...{

        // curl estimation
        HALF_CURL_START_LIMIT: 60.0,
        NO_CURL_START_LIMIT: 130.0,

        // direction estimation
        DISTANCE_VOTE_POWER: 1.1,
        SINGLE_ANGLE_VOTE_POWER: 0.9,
        TOTAL_ANGLE_VOTE_POWER: 1.6
      }, ...options
    };
  }

  estimate(keypoints, landmarks, handSide) {

    this.updateMovementCoordinates(keypoints.map((item, index) => { return { x: item[0], y: item[1], z: landmarks[index][2] } }), handSide);
    // step 1: calculate slopes
    let slopesXY = [];
    let slopesYZ = [];

    for (let finger of Finger.all) {

      let points = Finger.getPoints(finger);
      let slopeAtXY = [];
      let slopeAtYZ = [];

      for (let point of points) {

        let point1 = landmarks[point[0]];
        let point2 = landmarks[point[1]];

        // calculate single slope
        let slopes = this.getSlopes(point1, point2);
        let slopeXY = slopes[0];
        let slopeYZ = slopes[1];
        slopeAtXY.push(slopeXY);
        slopeAtYZ.push(slopeYZ);
      }

      slopesXY.push(slopeAtXY);
      slopesYZ.push(slopeAtYZ);
    }

    // step 2: calculate orientations
    // console.log('slopes', slopesYZ[0][3])
    let fingerCurls = [];
    let fingerDirections = [];

    for (let finger of Finger.all) {

      // start finger predictions from palm - except for thumb
      let pointIndexAt = (finger == Finger.Thumb) ? 1 : 0;

      let fingerPointsAt = Finger.getPoints(finger);
      let startPoint = landmarks[fingerPointsAt[pointIndexAt][0]];
      let midPoint = landmarks[fingerPointsAt[pointIndexAt + 1][1]];
      let endPoint = landmarks[fingerPointsAt[3][1]];

      // check if finger is curled
      let fingerCurled = this.estimateFingerCurl(
        startPoint, midPoint, endPoint
      );

      let fingerPosition = this.calculateFingerDirection(
        startPoint, midPoint, endPoint,
        slopesXY[finger].slice(pointIndexAt)
      );

      fingerCurls[finger] = fingerCurled;
      fingerDirections[finger] = fingerPosition;

    }

    let movement = this.calculateMovement(handSide)

    let profundity = this.calculateProfundity(handSide)

    let handDirection = this.calculateHandDirection(landmarks[0][0], landmarks[0][1], landmarks[2][0], landmarks[2][1], landmarks[17][0], landmarks[17][1], handSide)

    let handPosition = this.calculateHandPosition(handDirection, landmarks[0][0], landmarks[0][1], landmarks[9][0], landmarks[9][1], landmarks[13][0], landmarks[13][1])

    return { curls: fingerCurls, directions: fingerDirections, handDirection: handDirection, handPosition: handPosition, movementDirection: movement, profundity }
  }

  estimateFingerSpacing(gesture, landmarks) {
    gesture.fingerSpaces.forEach((item) => {
      let diffX = Math.abs(landmarks[item.pointFrom.Top][0] - landmarks[item.pointTo.Top][0]) * this.threshold
      let diffY = Math.abs(landmarks[item.pointFrom.Top][1] - landmarks[item.pointTo.Top][1]) * this.threshold
      let diffZ = Math.abs(landmarks[item.pointFrom.Top][2] - landmarks[item.pointTo.Top][2]) * this.threshold
      const calc = diffX + diffY

      if (item.distance === FingerSpacing.Crossed
        && landmarks[item.pointFrom.Top][0] >= landmarks[item.pointTo.Top][0] && landmarks[item.pointFrom.Base][0] < landmarks[item.pointTo.Base][0]) {
        item.matched = true
        return

      } else if (item.distance === FingerSpacing.Close && calc < 2.5) {
        item.matched = true
        return

      } else if (item.distance === FingerSpacing.Far && calc > 4) {
        item.matched = true
        return
      }

      item.matched = false
    })
  }

  // console.log('resukt', result)
  estimateDistance(hands, gesture) {
    // console.log('hands', hands)
    gesture.signals.forEach(signal => {
      signal.distancePoints.forEach(item => {
        const result = this.calculateDistance(item.pointFrom, item.pointTo, hands)
        result === item.distance ? item.matched = true : item.matched = false
      })
    })
  }

  calculateDistance(pointFrom, pointTo, hands) {
    const firstHandFrom = hands[0].keypoints[pointFrom];
    const secondHandFrom = hands[1].keypoints[pointFrom];
    const firstHandTo = hands[0].keypoints[pointTo];
    const secondHandTo = hands[1].keypoints[pointTo];

    const distance1 = Math.hypot(firstHandFrom.x - secondHandTo.x, firstHandFrom.y - secondHandTo.y);
    const distance2 = Math.hypot(secondHandFrom.x - firstHandTo.x, secondHandFrom.y - firstHandTo.y);

    if (distance1 < this.threshold || distance2 < this.threshold) {
      return Distance.Close;
    } else if (distance1 < 3 * this.threshold || distance2 < 3 * this.threshold) {
      return Distance.Moderate;
    } else if (distance1 < 5 * this.threshold || distance2 < 5 * this.threshold) {
      return Distance.Far;
    } else {
      return Distance.VeryFar;
    }
  }

  calculateHandDirection(palmX, palmY, thumbX, thumbY, pinkyX, pinkyY, handSide) {
    if (handSide === 'Right') {
      // Up hand comparation
      if (palmY > thumbY && palmY > pinkyY) {
        if (thumbX < pinkyX) {
          return HandDirection.FrontHand
        } else {
          return HandDirection.BackHand
        }
      }
      else if (palmY > thumbY && palmY < pinkyY && palmX < thumbX) {
        return HandDirection.FrontHand
      }
      else if (palmY > thumbY && palmY < pinkyY && palmX > thumbX) {
        return HandDirection.BackHand
      }
      else if (palmY < thumbY && palmY > pinkyY && palmX > thumbX) {
        return HandDirection.FrontHand
      }
      else if (palmY < thumbY && palmY > pinkyY && palmX < thumbX) {
        return HandDirection.BackHand
      }
      else if (palmY < pinkyY) {
        if (thumbX > pinkyX) {
          return HandDirection.FrontHand
        } else {
          return HandDirection.BackHand
        }
      }
    } else {
      // Left hand estimator
      if (palmY > thumbY && palmY > pinkyY) {
        if (thumbX > pinkyX) {
          return HandDirection.FrontHand
        } else {
          return HandDirection.BackHand
        }
      }
      else if (palmY > thumbY && palmY < pinkyY && palmX > thumbX) {
        return HandDirection.FrontHand
      }
      else if (palmY > thumbY && palmY < pinkyY && palmX < thumbX) {
        return HandDirection.BackHand
      }
      else if (palmY < thumbY && palmY > pinkyY && palmX < thumbX) {
        return HandDirection.FrontHand
      }
      else if (palmY < thumbY && palmY > pinkyY && palmX > thumbX) {
        return HandDirection.BackHand
      }
      else if (palmY < pinkyY) {
        if (thumbX < pinkyX) {
          return HandDirection.FrontHand
        } else {
          return HandDirection.BackHand
        }
      }
    }
  }

  calculateHandPosition(handDirection, palmX, palmY, middleX, middleY, ringX, ringY) {
    const deltaX = handDirection === HandDirection.FrontHand ? (ringX - palmX) : (middleX - palmX);
    const deltaY = handDirection === HandDirection.FrontHand ? (ringY - palmY) : (middleY - palmY);

    const angleRadians = Math.atan2(deltaY, deltaX);
    const angleDegrees = angleRadians * (180 / Math.PI);

    if (angleDegrees <= -135 && angleDegrees >= -180) {
      return HandPosition.HorizontalLeft
    } else if (angleDegrees <= -90 && angleDegrees >= -135) {
      return HandPosition.DiagonalUpLeft
    } else if (angleDegrees >= -90 && angleDegrees <= -45) {
      return HandPosition.VerticalUp
    } else if (angleDegrees >= -45 && angleDegrees <= 0) {
      return HandPosition.DiagonalUpRight
    } else if (angleDegrees >= 0 && angleDegrees <= 45) {
      return HandPosition.HorizontalRight
    } else if (angleDegrees >= 45 && angleDegrees <= 90) {
      return HandPosition.DiagonalDownRight
    } else if (angleDegrees >= 90 && angleDegrees <= 135) {
      return HandPosition.VerticalDown
    } else if (angleDegrees >= 135 && angleDegrees <= 180) {
      return HandPosition.DiagonalDownLeft
    }
  }

  calculateMovement(handSide) {
    let startCoord, endCoord;

    startCoord = this.prevCoordinates[handSide][0];
    endCoord = this.prevCoordinates[handSide][Math.min(this.prevCoordinates[handSide].length - 1, this.maxPrevCoordinates - 1)];

    const diffX = endCoord.x - startCoord.x;
    const diffY = endCoord.y - startCoord.y;
    this.movementDirection = MovementDirection.Static;

    if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) {
      this.movementDirection = MovementDirection.Static;
    } else if (Math.abs(diffX) > 30 && Math.abs(diffY) < 30) {
      this.movementDirection = startCoord.x < endCoord.x
        ? MovementDirection.HorizontalRight
        : MovementDirection.HorizontalLeft;
    } else if (Math.abs(diffX) < 30 && Math.abs(diffY) > 30) {
      this.movementDirection = startCoord.y > endCoord.y
        ? MovementDirection.VerticalUp
        : MovementDirection.VerticalDown;
    } else if (Math.abs(diffX) > 30 && Math.abs(diffY) > 30) {
      if (startCoord.y > endCoord.y && startCoord.x < endCoord.x) {
        this.movementDirection = MovementDirection.DiagonalUpRight;
      } else if (startCoord.y > endCoord.y && startCoord.x > endCoord.x) {
        this.movementDirection = MovementDirection.DiagonalUpLeft;
      } else if (startCoord.y < endCoord.y && startCoord.x < endCoord.x) {
        this.movementDirection = MovementDirection.DiagonalDownRight;
      } else if (startCoord.y < endCoord.y && startCoord.x > endCoord.x) {
        this.movementDirection = MovementDirection.DiagonalDownLeft;
      }
    }

    return this.movementDirection
  }

  // this.updateMovementCoordinates(keypoints[0][0], keypoints[0][1], keypoints[0][1] - keypoints[9][1], keypoints[5][0] - keypoints[17][0]);


  calculateProfundity(handSide) {
    let startCoord, endCoord, profundity;

    startCoord = this.prevCoordinates[handSide][0];
    endCoord = this.prevCoordinates[handSide][Math.min(this.prevCoordinates[handSide].length - 1, this.maxPrevCoordinates - 1)];

    const diffZ = Math.abs(endCoord.z - startCoord.z);

    if (diffZ < 5) {
      profundity = ProfundityDirection.Static
    } else {
      if (endCoord.z > startCoord.z) {
        profundity = ProfundityDirection.Shallowness
      } else {
        profundity = ProfundityDirection.Depth
      }
    }

    this.avgProfundity[handSide].push(profundity);

    if (this.avgProfundity[handSide].length > this.maxPrevCoordinates) {
      this.avgProfundity[handSide].shift();
    }

    let avg = { count: 0, item: 0 };

    [ProfundityDirection.Static, ProfundityDirection.Depth, ProfundityDirection.Shallowness].forEach(value => {
      const size = this.avgProfundity[handSide].filter(item => item === value).length
      if (size >= avg.count) avg = { count: size, item: value }
    })


    return avg.item
  }

  updateMovementCoordinates(handMap, handSide) {
    let base = Math.abs(handMap[9].x - handMap[13].x)
    let height = Math.abs(handMap[9].y - handMap[13].y)
    let profundity = Math.abs(handMap[9].z - handMap[13].z)

    const calc = (base + (height * 1.3)) + (profundity * videoConfig.width) * 1.3
    // console.log('test', { base, height: height * 1.3, profundity: (profundity * 640) * 1.3, total: (base + (height * 1.3)) + (profundity * 640) * 1.3 })

    this.prevCoordinates[handSide].push({ x: handMap[0].x, y: handMap[0].y, z: calc });

    if (this.prevCoordinates[handSide].length > this.maxPrevCoordinates) {
      this.prevCoordinates[handSide].shift(); // Remove o elemento mais antigo
    }
  }

  // point1, point2 are 2d or 3d point arrays (xy[z])
  // returns either a single scalar (2d) or array of two slopes (3d)
  getSlopes(point1, point2) {

    let slopeXY = this.calculateSlope(point1[0], point1[1], point2[0], point2[1]);
    if (point1.length == 2) {
      return slopeXY;
    }

    let slopeYZ = this.calculateSlope(point1[1], point1[2], point2[1], point2[2])
    return [slopeXY, slopeYZ];
  }

  angleOrientationAt(angle, weightageAt = 1.0) {

    let isVertical = 0;
    let isDiagonal = 0;
    let isHorizontal = 0;

    if (angle >= 75.0 && angle <= 105.0) {
      isVertical = 1 * weightageAt;
    }
    else if (angle >= 25.0 && angle <= 155.0) {
      isDiagonal = 1 * weightageAt;
    }
    else {
      isHorizontal = 1 * weightageAt;
    }

    return [isVertical, isDiagonal, isHorizontal];
  }

  estimateFingerCurl(startPoint, midPoint, endPoint) {

    let start_mid_x_dist = startPoint[0] - midPoint[0];
    let start_end_x_dist = startPoint[0] - endPoint[0];
    let mid_end_x_dist = midPoint[0] - endPoint[0];

    let start_mid_y_dist = startPoint[1] - midPoint[1];
    let start_end_y_dist = startPoint[1] - endPoint[1];
    let mid_end_y_dist = midPoint[1] - endPoint[1];

    let start_mid_z_dist = startPoint[2] - midPoint[2];
    let start_end_z_dist = startPoint[2] - endPoint[2];
    let mid_end_z_dist = midPoint[2] - endPoint[2];

    let start_mid_dist = Math.sqrt(
      start_mid_x_dist * start_mid_x_dist +
      start_mid_y_dist * start_mid_y_dist +
      start_mid_z_dist * start_mid_z_dist
    );
    let start_end_dist = Math.sqrt(
      start_end_x_dist * start_end_x_dist +
      start_end_y_dist * start_end_y_dist +
      start_end_z_dist * start_end_z_dist
    );
    let mid_end_dist = Math.sqrt(
      mid_end_x_dist * mid_end_x_dist +
      mid_end_y_dist * mid_end_y_dist +
      mid_end_z_dist * mid_end_z_dist
    );

    let cos_in = (
      mid_end_dist * mid_end_dist +
      start_mid_dist * start_mid_dist -
      start_end_dist * start_end_dist
    ) / (2 * mid_end_dist * start_mid_dist);

    if (cos_in > 1.0) {
      cos_in = 1.0;
    }
    else if (cos_in < -1.0) {
      cos_in = -1.0;
    }

    let angleOfCurve = Math.acos(cos_in);
    angleOfCurve = (57.2958 * angleOfCurve) % 180;

    let fingerCurl;
    if (angleOfCurve > this.options.NO_CURL_START_LIMIT) {
      fingerCurl = FingerCurl.NoCurl;
    }
    else if (angleOfCurve > this.options.HALF_CURL_START_LIMIT) {
      fingerCurl = FingerCurl.HalfCurl;
    }
    else {
      fingerCurl = FingerCurl.FullCurl;
    }

    return fingerCurl;
  }

  estimateHorizontalDirection(start_end_x_dist, start_mid_x_dist, mid_end_x_dist, max_dist_x) {
    let estimatedDirection;
    if (max_dist_x == Math.abs(start_end_x_dist)) {
      if (start_end_x_dist > 0) {
        estimatedDirection = FingerDirection.HorizontalLeft;
      } else {
        estimatedDirection = FingerDirection.HorizontalRight;
      }
    }
    else if (max_dist_x == Math.abs(start_mid_x_dist)) {
      if (start_mid_x_dist > 0) {
        estimatedDirection = FingerDirection.HorizontalLeft;
      } else {
        estimatedDirection = FingerDirection.HorizontalRight;
      }
    }
    else {
      if (mid_end_x_dist > 0) {
        estimatedDirection = FingerDirection.HorizontalLeft;
      } else {
        estimatedDirection = FingerDirection.HorizontalRight;
      }
    }

    return estimatedDirection;
  }

  estimateVerticalDirection(start_end_y_dist, start_mid_y_dist, mid_end_y_dist, max_dist_y) {

    let estimatedDirection;
    if (max_dist_y == Math.abs(start_end_y_dist)) {
      if (start_end_y_dist < 0) {
        estimatedDirection = FingerDirection.VerticalDown;
      } else {
        estimatedDirection = FingerDirection.VerticalUp;
      }
    }
    else if (max_dist_y == Math.abs(start_mid_y_dist)) {
      if (start_mid_y_dist < 0) {
        estimatedDirection = FingerDirection.VerticalDown;
      } else {
        estimatedDirection = FingerDirection.VerticalUp;
      }
    }
    else {
      if (mid_end_y_dist < 0) {
        estimatedDirection = FingerDirection.VerticalDown;
      } else {
        estimatedDirection = FingerDirection.VerticalUp;
      }
    }

    return estimatedDirection;
  }

  estimateDiagonalDirection(
    start_end_y_dist, start_mid_y_dist, mid_end_y_dist, max_dist_y,
    start_end_x_dist, start_mid_x_dist, mid_end_x_dist, max_dist_x
  ) {

    let estimatedDirection;
    let reqd_vertical_direction = this.estimateVerticalDirection(
      start_end_y_dist, start_mid_y_dist, mid_end_y_dist, max_dist_y
    );
    let reqd_horizontal_direction = this.estimateHorizontalDirection(
      start_end_x_dist, start_mid_x_dist, mid_end_x_dist, max_dist_x
    );

    if (reqd_vertical_direction == FingerDirection.VerticalUp) {
      if (reqd_horizontal_direction == FingerDirection.HorizontalLeft) {
        estimatedDirection = FingerDirection.DiagonalUpLeft;
      } else {
        estimatedDirection = FingerDirection.DiagonalUpRight;
      }
    }
    else {
      if (reqd_horizontal_direction == FingerDirection.HorizontalLeft) {
        estimatedDirection = FingerDirection.DiagonalDownLeft;
      } else {
        estimatedDirection = FingerDirection.DiagonalDownRight;
      }
    }

    return estimatedDirection;
  }

  calculateFingerDirection(startPoint, midPoint, endPoint, fingerSlopes) {

    let start_mid_x_dist = startPoint[0] - midPoint[0];
    let start_end_x_dist = startPoint[0] - endPoint[0];
    let mid_end_x_dist = midPoint[0] - endPoint[0];

    let start_mid_y_dist = startPoint[1] - midPoint[1];
    let start_end_y_dist = startPoint[1] - endPoint[1];
    let mid_end_y_dist = midPoint[1] - endPoint[1];

    let max_dist_x = Math.max(
      Math.abs(start_mid_x_dist),
      Math.abs(start_end_x_dist),
      Math.abs(mid_end_x_dist)
    );
    let max_dist_y = Math.max(
      Math.abs(start_mid_y_dist),
      Math.abs(start_end_y_dist),
      Math.abs(mid_end_y_dist)
    );

    let voteVertical = 0.0;
    let voteDiagonal = 0.0;
    let voteHorizontal = 0.0;

    let start_end_x_y_dist_ratio = max_dist_y / (max_dist_x + 0.00001);
    if (start_end_x_y_dist_ratio > 1.5) {
      voteVertical += this.options.DISTANCE_VOTE_POWER;
    }
    else if (start_end_x_y_dist_ratio > 0.66) {
      voteDiagonal += this.options.DISTANCE_VOTE_POWER;
    }
    else {
      voteHorizontal += this.options.DISTANCE_VOTE_POWER;
    }

    let start_mid_dist = Math.sqrt(
      start_mid_x_dist * start_mid_x_dist + start_mid_y_dist * start_mid_y_dist
    );
    let start_end_dist = Math.sqrt(
      start_end_x_dist * start_end_x_dist + start_end_y_dist * start_end_y_dist
    );
    let mid_end_dist = Math.sqrt(
      mid_end_x_dist * mid_end_x_dist + mid_end_y_dist * mid_end_y_dist
    );

    let max_dist = Math.max(start_mid_dist, start_end_dist, mid_end_dist);
    let calc_start_point_x = startPoint[0],
      calc_start_point_y = startPoint[1];
    let calc_end_point_x = endPoint[0],
      calc_end_point_y = endPoint[1];

    if (max_dist == start_mid_dist) {
      calc_end_point_x = endPoint[0],
        calc_end_point_y = endPoint[1];
    }
    else if (max_dist == mid_end_dist) {
      calc_start_point_x = midPoint[0],
        calc_start_point_y = midPoint[1];
    }

    let calcStartPoint = [calc_start_point_x, calc_start_point_y];
    let calcEndPoint = [calc_end_point_x, calc_end_point_y];

    let totalAngle = this.getSlopes(calcStartPoint, calcEndPoint);
    let votes = this.angleOrientationAt(totalAngle, this.options.TOTAL_ANGLE_VOTE_POWER);
    voteVertical += votes[0];
    voteDiagonal += votes[1];
    voteHorizontal += votes[2];

    for (let fingerSlope of fingerSlopes) {
      let votes = this.angleOrientationAt(fingerSlope, this.options.SINGLE_ANGLE_VOTE_POWER);
      voteVertical += votes[0];
      voteDiagonal += votes[1];
      voteHorizontal += votes[2];
    }

    // in case of tie, highest preference goes to Vertical,
    // followed by horizontal and then diagonal
    let estimatedDirection;
    if (voteVertical == Math.max(voteVertical, voteDiagonal, voteHorizontal)) {
      estimatedDirection = this.estimateVerticalDirection(
        start_end_y_dist,
        start_mid_y_dist,
        mid_end_y_dist, max_dist_y
      );
    }
    else if (voteHorizontal == Math.max(voteDiagonal, voteHorizontal)) {
      estimatedDirection = this.estimateHorizontalDirection(
        start_end_x_dist,
        start_mid_x_dist,
        mid_end_x_dist, max_dist_x
      );
    }
    else {
      estimatedDirection = this.estimateDiagonalDirection(
        start_end_y_dist, start_mid_y_dist,
        mid_end_y_dist, max_dist_y,
        start_end_x_dist, start_mid_x_dist,
        mid_end_x_dist, max_dist_x
      );
    }

    return estimatedDirection;
  }

  calculateSlope(point1x, point1y, point2x, point2y) {

    let value = (point1y - point2y) / (point1x - point2x);
    let slope = Math.atan(value) * 180 / Math.PI;

    if (slope <= 0) {
      slope = -slope;
    }
    else if (slope > 0) {
      slope = 180 - slope;
    }

    return slope;
  }
}
