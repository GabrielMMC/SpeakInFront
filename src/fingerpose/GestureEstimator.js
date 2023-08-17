import FingerPoseEstimator from './FingerPoseEstimator';
import { Finger, FingerCurl, FingerDirection, HandDirection } from './FingerDescription';

export default class GestureEstimator {
  constructor(knownGestures, estimatorOptions = {}) {
    this.estimator = new FingerPoseEstimator(estimatorOptions);

    // list of predefined gestures
    this.gestures = knownGestures;
    this.handDirection = null
  }

  #getLandMarksFromKeypoints(keypoints) {
    return keypoints.map(keypoint =>
      [keypoint.x, keypoint.y, keypoint.z]
    );
  }

  estimate(keypoints, keypoints3D, minScore, handDirection) {
    let gesturesFound = [];

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
        let resetMultipleGestures = false
        let resetTimeout = false

        if (!window.gestures) {
          window.gestures = []
        }

        const isGestureNotFound = !window.gestures.some(array => {
          return array.some(item => item.name === gesture[0].name)
        })

        if (isGestureNotFound) {
          window.gestures = [
            ...window.gestures,
            gesture.map(item => {
              item.finishGesture = false
              return item
            })
          ]
        }

        const gestureOnArray = window.gestures.filter(array => {
          return array.some(item => item.name === gesture[0].name);
        })[0];

        gestureOnArray.map((item, index) => {
          if (!item.finishGesture) {
            const score = item.matchAgainst(estimate.curls, estimate.directions, estimate.handDirection);
            // if (score >= minScore) {
            //   console.log(`aprrovedindex${index}`, item);
            // }
            if (score >= minScore && (index === 0 || gestureOnArray[index - 1].finishGesture)) {
              console.log(`aprrovedindex${index}`, item);
              item.finishGesture = true
              clearTimeout(resetTimeout)
              resetTimeout = setTimeout(() => { window.gestures = null }, 800);

              if (gestureOnArray.length === index + 1) {
                console.log('last gest')
                gesturesFound.push({
                  name: item.name,
                  score: score,
                  isSequenceSignal: true
                });

                resetMultipleGestures = true
              }
            }
          }

          return item
        })

        if (resetMultipleGestures) {
          window.gestures = null
        }
      } else {
        let score = gesture.matchAgainst(estimate.curls, estimate.directions, handDirection);
        if (score >= minScore) {
          gesturesFound.push({
            name: gesture.name,
            score: score
          });
        }
      }
    }

    return {
      poseData: poseData,
      handDirection: HandDirection.getName(estimate.handDirection),
      gestures: gesturesFound
    };
  }
}