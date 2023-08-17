import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { POST } from '../utils/request'
import loadFingerpose from '../fingerpose/loadFingerpose'

const Room = () => {
  const [subtitle, setSubtitle] = React.useState([])
  const [averageSubtitle, setAverageSubtitle] = React.useState([])
  const localVideoRef = React.useRef(null)
  const userVideoRef = React.useRef(null)
  const peer = React.useRef(null)
  const params = useParams()
  const echo = useSelector(state => state.AppReducer.echo)
  const user = useSelector(state => state.AppReducer.user)

  React.useEffect(() => {
    if (!echo) {
      return
    }

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: 700,
        height: 500,
        frameRate: { max: 30 }
      }
    }).then(stream => {
      addVideoStream(localVideoRef, stream)

      peer.current = new SimplePeer({
        initiator: `/room/${params.id}`,
        trickle: false,
        stream,
      });

      peer.current.on("error", (err) => console.log("error", err));

      peer.current.on("signal", async (signal) => {
        console.log('signal type', signal.type)

        const data = JSON.stringify(signal);

        echo.private(`call.channel.${params.id}`).whisper('connectToRoom', {
          user_id: user.id,
          rtc_signal: data,
        });
      });

      peer.current.on("connect", () => {
        console.log("CONNECT");
        peer.current.send("whatever" + Math.random()); // Or Files
      });

      peer.current.on("stream", async function (stream) {
        console.log('stream')
        addVideoStream(userVideoRef, stream)
      });

      echo.private(`call.channel.${params.id}`).listenForWhisper('connectToRoom', (e) => {
        if (e.user_id !== user.id) {
          peer.current.signal(e.rtc_signal)
        }
      });
    })

  }, [echo])

  const addVideoStream = (videoRef, stream) => {
    videoRef.current.srcObject = stream
    videoRef.current.play()

    const canvas = document.querySelector("#pose-canvas")
    canvas.width = 700
    canvas.height = 500
    console.log("Canvas initialized")

    videoRef.current.addEventListener("loadeddata", async event => {
      console.log("Camera is ready")
      loadFingerpose(updateSubtitle)
    })
  }

  const updateSubtitle = React.useCallback((signal, isSequenceSignal) => {
    if (isSequenceSignal) {
      return setSubtitle(subtitle => [...subtitle, signal])
    }

    setAverageSubtitle(state => {
      const newState = [...state, signal];
      const sequenceLength = getLongestSequence(newState, signal);

      if (sequenceLength >= 4) {
        setSubtitle(subtitle => {
          if (subtitle[subtitle.length - 1] !== signal) {
            return [...subtitle, signal]
          }
          return subtitle
        });

        return [];
      }
      return newState;
    });
  }, []);

  function getLongestSequence(array, signal) {
    let longestSequence = 0;
    let currentSequence = 0;

    for (const item of array) {
      if (item === signal) {
        currentSequence++;
        longestSequence = Math.max(longestSequence, currentSequence);
      } else {
        currentSequence = 0;
      }
    }

    return longestSequence;
  }

  const formatSubtitle = () => {
    let result = ''

    for (let i = 0; i < subtitle.length; i++) {
      if (i > 0 && subtitle[i - 1].endsWith("_") && subtitle[i].startsWith("_")) {
        result += " ";
      }

      result += subtitle[i].replace(/_/g, " ");
    }

    return result
  }


  return (
    <div className="d-flex h-100">
      <div className="col-6">
        <div className='bg-dark video-content d-flex'>
          <video ref={userVideoRef} playsInline />
        </div>

        <div className='video-content position-relative'>
          <video ref={localVideoRef} id="pose-video" className="layer" playsInline></video>
          <canvas id="pose-canvas" className="layer"></canvas>
          <div id="pose-result-left" className="layer pose-result"></div>
          <br />
          <div id="pose-result-right" className="layer pose-result"></div>
          <div className='position-absolute top-100 start-50 translate-middle'>
            <p className="subtitle">{formatSubtitle()}</p>
          </div>
        </div>
      </div>



      {/* <div className='bg-dark video-content mt-5'>
      </div> */}
      <div className="debug col-6">
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
        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Hand direction</span>
        <p className='left-hand-direction mb-3'>-</p>
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
        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Hand direction</span>
        <p className='right-hand-direction mb-3'>-</p>
      </div>
    </div>
  )
}

export default Room