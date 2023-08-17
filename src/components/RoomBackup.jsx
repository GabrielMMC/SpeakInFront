import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Gestures from '../fingerpose/gestures'
import GestureEstimator from '../fingerpose/GestureEstimator'

const RoomBackup = () => {

  React.useEffect(() => {
    initCamera(
      config.video.width, config.video.height, config.video.fps
    ).then(video => {
      video.play()
      video.addEventListener("loadeddata", event => {
        console.log("Camera is ready")
        main()
      })
    })

    const canvas = document.querySelector("#pose-canvas")
    canvas.width = config.video.width
    canvas.height = config.video.height
    console.log("Canvas initialized")
  }, [])

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
    'thumbs_up': '👍',
    'victory': '✌🏻'
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

  async function main(video, canvas) {

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
      Gestures.ThumbsUpGesture
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

        const est = GE.estimate(hand.keypoints3D, 9)
        if (est.gestures.length > 0) {

          // find gesture with highest match score
          let result = est.gestures.reduce((p, c) => {
            return (p.score > c.score) ? p : c
          })
          const chosenHand = hand.handedness.toLowerCase()
          resultLayer[chosenHand].innerText = gestureStrings[result.name]
          updateDebugInfo(est.poseData, chosenHand)
        }

      }
      // ...and so on
      setTimeout(() => { estimateHands() }, 1000 / config.video.fps)
    }

    estimateHands()
    console.log("Starting predictions")
  }

  async function initCamera(width, height, fps) {

    const constraints = {
      audio: false,
      video: {
        facingMode: "user",
        // width: width,
        // height: height,
        frameRate: { max: fps }
      }
    }

    const video = document.querySelector("#pose-video")
    video.width = width
    video.height = height

    // get video stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => { resolve(video) }
    })
  }

  function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
  }

  function updateDebugInfo(data, hand) {
    const summaryTable = `#summary-${hand}`
    for (let fingerIdx in data) {
      document.querySelector(`${summaryTable} span#curl-${fingerIdx}`).innerHTML = data[fingerIdx][1]
      document.querySelector(`${summaryTable} span#dir-${fingerIdx}`).innerHTML = data[fingerIdx][2]
    }
  }

  window.addEventListener("DOMContentLoaded", () => {

    initCamera(
      config.video.width, config.video.height, config.video.fps
    ).then(video => {
      video.play()
      video.addEventListener("loadeddata", event => {
        console.log("Camera is ready")
        main()
      })
    })

    const canvas = document.querySelector("#pose-canvas")
    canvas.width = config.video.width
    canvas.height = config.video.height
    console.log("Canvas initialized")
  });

  return (
    <div className="container">

      <div className="video">
        <div id="video-container">
          <video id="pose-video" className="layer" playsInline></video>
          <canvas id="pose-canvas" className="layer"></canvas>
          <div id="pose-result-left" className="layer pose-result"></div>
          <br />
          <div id="pose-result-right" className="layer pose-result"></div>
        </div>
      </div>

      <div className="debug">
        <h2>Left Hand</h2>
        <table id="summary-left" className="summary">
          <thead>
            <tr>
              <th>Idx</th>
              <th>Finger</th>
              <th style={{ width: 110 }}>Curl</th>
              <th style={{ width: 170 }}>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>Thumb</td>
              <td><span id="curl-0">-</span></td>
              <td><span id="dir-0">-</span></td>
            </tr>
            <tr>
              <td>1</td>
              <td>Index</td>
              <td><span id="curl-1">-</span></td>
              <td><span id="dir-1">-</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Middle</td>
              <td><span id="curl-2">-</span></td>
              <td><span id="dir-2">-</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ring</td>
              <td><span id="curl-3">-</span></td>
              <td><span id="dir-3">-</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Pinky</td>
              <td><span id="curl-4">-</span></td>
              <td><span id="dir-4">-</span></td>
            </tr>
          </tbody>
        </table>
        <br />
        <h2>Right Hand</h2>
        <table id="summary-right" className="summary">
          <thead>
            <tr>
              <th>Idx</th>
              <th>Finger</th>
              <th style={{ width: 110 }}>Curl</th>
              <th style={{ width: 170 }}>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>Thumb</td>
              <td><span id="curl-0">-</span></td>
              <td><span id="dir-0">-</span></td>
            </tr>
            <tr>
              <td>1</td>
              <td>Index</td>
              <td><span id="curl-1">-</span></td>
              <td><span id="dir-1">-</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Middle</td>
              <td><span id="curl-2">-</span></td>
              <td><span id="dir-2">-</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ring</td>
              <td><span id="curl-3">-</span></td>
              <td><span id="dir-3">-</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Pinky</td>
              <td><span id="curl-4">-</span></td>
              <td><span id="dir-4">-</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RoomBackup