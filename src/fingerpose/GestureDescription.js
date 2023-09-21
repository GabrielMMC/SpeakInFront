export default class GestureDescription {
  constructor(name) {

    // name (should be unique)
    this.name = name;

    // gesture as described by curls / directions
    this.curls = {};
    this.directions = {};
    this.handMovements = [];
    this.distancePoints = [];
    this.fingerDistancePoints = [];
    this.fingerSpaces = [];
    this.handPositions = [];
    this.handDirection = null;
    this.profundityDirection = null;
    this.lastMovement = null;
  }

  addCurl(finger, curl, contrib = 1.0) {
    if (typeof this.curls[finger] === 'undefined') {
      this.curls[finger] = [];
    }
    this.curls[finger].push([curl, contrib]);
  }

  addDirection(finger, position, contrib = 1.0) {
    if (typeof this.directions[finger] === 'undefined') {
      this.directions[finger] = [];
    }
    this.directions[finger].push([position, contrib]);
  }

  addHandDirection(position) {
    this.handDirection = position
  }

  addHandPosition(position) {
    this.handPositions = [...this.handPositions, position]
  }

  addProfundity(profundity) {
    this.profundityDirection = profundity
  }

  addMovementDirection(direction) {
    this.handMovements = [...this.handMovements, { direction, matched: false }]
  }

  addHandDistance(pointFrom, pointTo, distance) {
    this.distancePoints = [...this.distancePoints, { pointFrom, pointTo, distance, matched: false }]
  }

  addFingerDistance(pointFrom, pointTo, distance) {
    this.fingerDistancePoints = [...this.fingerDistancePoints, { pointFrom, pointTo, distance, matched: false }]
  }

  addFingerSpacing(pointFrom, pointTo, distance) {
    this.fingerSpaces = [...this.fingerSpaces, { pointFrom, pointTo, distance, matched: false }]
  }

  matchAgainst(detectedCurls, detectedDirections, handDirection, handPosition, movementDirection, profundityDirection) {
    let score = 0.0;
    let numParameters = 0;

    // look at the detected curl of each finger and compare with
    // the expected curl of this finger inside current gesture
    for (let fingerIdx in detectedCurls) {

      let detectedCurl = detectedCurls[fingerIdx];
      let expectedCurls = this.curls[fingerIdx];

      if (typeof expectedCurls === 'undefined') {
        // no curl description available for this finger
        // => no contribution to the final score
        continue;
      }

      // increase the number of relevant parameters
      numParameters++;

      // compare to each possible curl of this specific finger
      let matchingCurlFound = false;
      let highestCurlContrib = 0;
      for (const [expectedCurl, contrib] of expectedCurls) {
        if (detectedCurl == expectedCurl) {
          score += contrib;
          highestCurlContrib = Math.max(highestCurlContrib, contrib);
          matchingCurlFound = true;
          break;
        }
      }

      // subtract penalty if curl was expected but not found
      if (!matchingCurlFound) {
        score -= highestCurlContrib;
      }
    }

    // same for detected direction of each finger
    for (let fingerIdx in detectedDirections) {

      let detectedDirection = detectedDirections[fingerIdx];
      let expectedDirections = this.directions[fingerIdx];

      if (typeof expectedDirections === 'undefined') {
        // no direction description available for this finger
        // => no contribution to the final score
        continue;
      }

      // increase the number of relevant parameters
      numParameters++;

      // compare to each possible direction of this specific finger
      let matchingDirectionFound = false;
      let highestDirectionContrib = 0;
      for (const [expectedDirection, contrib] of expectedDirections) {
        if (detectedDirection == expectedDirection) {
          score += contrib;
          highestDirectionContrib = Math.max(highestDirectionContrib, contrib);
          matchingDirectionFound = true;
          break;
        }
      }

      // subtract penalty if direction was expected but not found
      if (!matchingDirectionFound) {
        score -= highestDirectionContrib;
      }
    }

    if (this.handDirection !== null && handDirection !== this.handDirection) {
      return 0;
    }

    if (this.handPositions.length > 0 && !this.handPositions.some(item => item === handPosition)) {
      return 0;
    }

    this.handMovements.forEach((item, index) => {
      if (index === 0 || this.handMovements[index - 1].matched) {
        if (item.direction === movementDirection && movementDirection !== this.lastMovement) {
          item.matched = true;
        }
      }
    });

    this.lastMovement = movementDirection;

    if (this.handMovements.length > 0 && this.handMovements.some(item => !item.matched)) {
      return 0
    } else {
      this.handMovements.forEach(item => item.matched = false)

    }

    if (this.handMovements.length > 1 && this.handMovements.every(item => item.matched)) {
      this.handMovements.forEach(item => item.matched = false)
    }

    if (this.distancePoints.length > 0 && !this.distancePoints.every(item => item.matched)) {
      return 0
    }

    if (this.fingerSpaces.length > 0 && !this.fingerSpaces.every(item => item.matched)) {
      return 0
    }


    if (this.profundityDirection !== null && this.profundityDirection !== profundityDirection) {

      return 0
    }

    // multiply final score with 10 (to maintain compatibility)
    let finalScore = (score / numParameters) * 10;

    return finalScore;
  }
}