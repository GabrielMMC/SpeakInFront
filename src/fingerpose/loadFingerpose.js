import Gestures from '../fingerpose/gestures'
import GestureEstimator from '../fingerpose/GestureEstimator'
import { MovementDirection } from './FingerDescription'

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
  'a': 'a',
  'b': 'b',
  'c': 'c',
  'd': 'd',
  'e': 'e',
  'f': 'f',
  'g': 'g',
  'h': 'h',
  'i': 'i',
  'j': 'j',
  'k': 'k',
  'l': 'l',
  'm': 'm',
  'n': 'n',
  'o': 'o',
  'p': 'p',
  'q': 'q',
  'r': 'r',
  's': 's',
  't': 't',
  'u': 'u',
  'v': 'v',
  'w': 'w',
  'x': 'x',
  'y': 'y',
  'z': 'z',
  'thumbs_up': ' joia ',
  'help': ' ajuda ',
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
    Gestures.AGesture,
    Gestures.BGesture,
    Gestures.CGesture,
    Gestures.DGesture,
    Gestures.EGesture,
    Gestures.FGesture,
    Gestures.GGesture,
    Gestures.HGesture,
    Gestures.IGesture,
    Gestures.JGesture,
    Gestures.KGesture,
    Gestures.LGesture,
    Gestures.MGesture,
    Gestures.NGesture,
    Gestures.OGesture,
    Gestures.PGesture,
    Gestures.QGesture,
    Gestures.RGesture,
    Gestures.SGesture,
    Gestures.TGesture,
    Gestures.UGesture,
    Gestures.VGesture,
    Gestures.WGesture,
    Gestures.XGesture,
    Gestures.YGesture,
    Gestures.ZGesture,
    // Gestures.ThumbsUpGesture,
    // Gestures.HelpGesture
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
      const est = GE.estimate(hand.keypoints, hand.keypoints3D, 10, hand.handedness, hands)
      const chosenHand = hand.handedness.toLowerCase()
      if (est.gestures.length > 0) {

        // find gesture with highest match score
        let result = est.gestures.reduce((p, c) => {
          return (p.score > c.score) ? p : c
        })
        resultLayer[chosenHand].innerText = gestureStrings[result.name]
        updateSubtitle(gestureStrings[result.name], result?.isSequenceSignal, result?.isMovementSignal)
      }
      updateDebugInfo(est.poseData, chosenHand, est.handDirection, est.handPosition, est.movementDirection, est.profundityDirection)
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

function updateDebugInfo(data, hand, handDirection, handPosition, movementDirection, profundityDirection) {
  const summaryTable = `#summary-${hand}`

  for (let fingerIdx in data) {
    document.querySelector(`${summaryTable} span#curl-${fingerIdx}`).innerHTML = data[fingerIdx][1]
    document.querySelector(`${summaryTable} span#dir-${fingerIdx}`).innerHTML = data[fingerIdx][2]
  }
  document.querySelector(`.${hand}-hand-direction`).textContent = handDirection ?? '-'
  document.querySelector(`.${hand}-hand-position`).textContent = handPosition ?? '-'
  document.querySelector(`.${hand}-movement-direction`).textContent = movementDirection ?? '-'
  document.querySelector(`.${hand}-profundity-direction`).textContent = profundityDirection ?? '-'
}
