import FingerPoseEstimator from './FingerPoseEstimator';
import { Finger, FingerCurl, FingerDirection, HandDirection, HandPosition, MovementDirection, ProfundityDirection } from './FingerDescription';

export default class GestureEstimator {
  constructor(knownGestures, estimatorOptions = {}) {
    this.estimator = new FingerPoseEstimator(estimatorOptions);

    // list of predefined gestures
    this.gestures = knownGestures;
    this.gestureFrames = [];
    this.handDirection = null;
    this.minScore = null;
  }

  #getLandMarksFromKeypoints(keypoints) {
    return keypoints.map(keypoint =>
      [keypoint.x, keypoint.y, keypoint.z]
    );
  }

  estimate(keypoints, keypoints3D, minScore, handDirection, hands) {
    let gesturesFound = [];

    if (!this.minScore) {
      this.minScore = minScore
    }

    const landmarks = this.#getLandMarksFromKeypoints(keypoints);
    const landmarks3D = this.#getLandMarksFromKeypoints(keypoints3D);
    // step 1: get estimations of curl / direction for each finger
    const estimate = this.estimator.estimate(landmarks, landmarks3D, handDirection);

    let poseData = [];
    for (let fingerIdx of Finger.all) {
      poseData.push([
        Finger.getName(fingerIdx),
        FingerCurl.getName(estimate.curls[fingerIdx]),
        FingerDirection.getName(estimate.directions[fingerIdx]),
      ]);
    }

    // step 2: compare gesture description to each known gesture
    for (let gesture of this.gestures) {
      if (Array.isArray(gesture)) {
        gesture.forEach(item => { item.fingerSpaces.length > 0 && this.estimator.estimateFingerSpacing(item, landmarks3D) })

        this.multiFrameGesture(gesture, estimate, gesturesFound)
      }

      if (!Array.isArray(gesture) && gesture.fingerSpaces?.length > 0) {
        this.estimator.estimateFingerSpacing(gesture, landmarks3D)
      }

      if (!Array.isArray(gesture) && !gesture.multiHands) {
        this.simpleGesture(gesture, estimate, gesturesFound)
      }

      if (gesture.multiHands && hands.length === 2) {
        this.multiHandsGesture(gesture, hands, gesturesFound)
      }
    }

    return {
      poseData: poseData,
      handDirection: HandDirection.getName(estimate.handDirection),
      handPosition: HandPosition.getName(estimate.handPosition),
      movementDirection: MovementDirection.getName(estimate.movementDirection),
      profundityDirection: ProfundityDirection.getName(estimate.profundity),
      gestures: gesturesFound
    };
  }

  simpleGesture(gesture, estimate, gesturesFound) {
    let score = gesture.matchAgainst(estimate.curls, estimate.directions, estimate.handDirection, estimate.handPosition, estimate.movementDirection, estimate.profundity);
    if (score >= this.minScore) {
      gesturesFound.push({
        name: gesture.name,
        score: score,
        isMovementSignal: gesture.handMovements.length > 0 ? true : false
      });
    }
  }

  multiHandsGesture(gesture, hands, gesturesFound) {
    this.estimator.estimateDistance(hands, gesture);

    gesture.signals.forEach((item, index) => {
      const handEstimate = this.estimator.estimate(this.#getLandMarksFromKeypoints(hands[index].keypoints), this.#getLandMarksFromKeypoints(hands[index].keypoints3D), hands[index].handedness);

      const score = item.matchAgainst(handEstimate.curls, handEstimate.directions, handEstimate.handDirection, handEstimate.handPosition, handEstimate.movementDirection, handEstimate.profundity)

      if (score >= this.minScore && !item.matched) {
        item.matched = true
      } else {
        item.macthed = false
      }
    })

    if (gesture.signals.every(item => item.matched)) {
      gesturesFound.push({
        name: gesture.signals[0].name,
        score: 10,
        // isMovementSignal: gesture.signals.some(item => item.handMovements.length > 0) ? true : false
      });

      gesture.signals.forEach(signal => { signal.matched = false })
    }
  }

  multiFrameGesture(gesture, estimate, gesturesFound) {
    let resetTimeout = () => { }

    const isGestureNotFound = !this.gestureFrames.some(array => {
      return array.some(item => item.name === gesture[0].name)
    })

    if (isGestureNotFound) {
      this.gestureFrames = [
        ...this.gestureFrames,
        gesture.map(item => {
          item.matched = false
          return item
        })
      ]
    }

    const gestureOnArray = this.gestureFrames.find(array => {
      return array.some(item => item.name === gesture[0].name);
    });

    gestureOnArray.map((item, index) => {
      if (item.matched) {
        return item
      }

      const score = item.matchAgainst(estimate.curls, estimate.directions, estimate.handDirection, estimate.handPosition, estimate.movementDirection, estimate.profundity);

      if (score >= this.minScore && (index === 0 || gestureOnArray[index - 1].matched)) {
        // console.log('aprroved index', gestureOnArray[index])
        item.matched = true
        clearTimeout(resetTimeout)
        resetTimeout = setTimeout(() => { gestureOnArray.forEach(resetItem => { resetItem.matched = false }) }, 800);
      }

      return item
    })

    if (gestureOnArray.every(item => item.matched)) {
      gesturesFound.push({
        name: gestureOnArray[0].name,
        score: 10,
        isSequenceSignal: true
      });

      gestureOnArray.forEach(resetItem => { resetItem.matched = false })
    }
  }
}