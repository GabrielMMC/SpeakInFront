import Gestures from '../fingerpose/gestures'
import GestureEstimator from '../fingerpose/GestureEstimator'

const config = {
  video: { width: 640, height: 480, fps: 30 }
}

const landmarkColors = {
  thumb: 'red',
  index: 'blue',
  middle: 'yellow',
  ring: 'green',
  pinky: 'pink',
  wrist: 'white'
}

const gestureStrings = {
  '_thumbs_up_': '👍',
  'v': 'V',
  'g': 'G',
  'l': 'L',
  'j': 'J',
  'h': 'H',
}

async function createDetector() {
  return window.handPoseDetection.createDetector(
    window.handPoseDetection.SupportedModels.MediaPipeHands,
    {
      runtime: "mediapipe",
      modelType: "full",
      maxHands: 2,
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
    }
  )
}

export default async (updateSubtitle) => {
  const video = document.querySelector("#pose-video")
  const canvas = document.querySelector("#pose-canvas")
  const ctx = canvas.getContext("2d")

  const resultLayer = {
    right: document.querySelector("#pose-result-right"),
    left: document.querySelector("#pose-result-left")
  }
  // configure gesture estimator
  // add "✌🏻" and "👍" as sample gestures
  const knownGestures = [
    Gestures.VictoryGesture,
    Gestures.ThumbsUpGesture,
    Gestures.GGesture,
    Gestures.LGesture,
    Gestures.JGesture,
    Gestures.HGesture,
  ]

  const GE = new GestureEstimator(knownGestures)
  // load handpose model
  const detector = await createDetector()
  console.log("mediaPose model loaded")

  // main estimation loop
  const estimateHands = async () => {

    // clear canvas overlay
    ctx.clearRect(0, 0, config.video.width, config.video.height)
    resultLayer.right.innerText = ''
    resultLayer.left.innerText = ''

    // get hand landmarks from video
    const hands = await detector.estimateHands(video, {
      flipHorizontal: true
    })

    for (const hand of hands) {
      for (const keypoint of hand.keypoints) {
        const name = keypoint.name.split('_')[0].toString().toLowerCase()
        const color = landmarkColors[name]
        drawPoint(ctx, keypoint.x, keypoint.y, 3, color)
      }

      // console.log('hand', hand)
      const est = GE.estimate(hand.keypoints, hand.keypoints3D, 10, hand.handedness)
      const chosenHand = hand.handedness.toLowerCase()
      if (est.gestures.length > 0) {

        // find gesture with highest match score
        let result = est.gestures.reduce((p, c) => {
          return (p.score > c.score) ? p : c
        })
        resultLayer[chosenHand].innerText = gestureStrings[result.name]
        updateSubtitle(result.name, result?.isSequenceSignal)

      }
      updateDebugInfo(est.poseData, chosenHand, est.handDirection)
    }
    // ...and so on
    setTimeout(() => { estimateHands() }, 1000 / config.video.fps)
  }

  estimateHands()
  console.log("Starting predictions")
}

function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}

function updateDebugInfo(data, hand, handDirection) {
  const summaryTable = `#summary-${hand}`

  for (let fingerIdx in data) {
    document.querySelector(`${summaryTable} span#curl-${fingerIdx}`).innerHTML = data[fingerIdx][1]
    document.querySelector(`${summaryTable} span#dir-${fingerIdx}`).innerHTML = data[fingerIdx][2]
  }
  document.querySelector(`.${hand}-hand-direction`).textContent = handDirection
}
