import { Finger, FingerCurl, FingerDirection, HandDirection, HandPosition, MovementDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe first frame of "K" gesture
const FirstKDescription = new GestureDescription('k');

// Hand position config
FirstKDescription.addHandPosition(HandPosition.DiagonalUpLeft);
FirstKDescription.addHandPosition(HandPosition.DiagonalUpRight);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  FirstKDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0)
  FirstKDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0)
  FirstKDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  FirstKDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle]) {
  FirstKDescription.addCurl(finger, FingerCurl.NoCurl, 1.0)
}

// Fingers config
for (let finger of [Finger.Ring, Finger.Pinky]) {
  FirstKDescription.addCurl(finger, FingerCurl.FullCurl, 1.0)
}


// Describe first frame of "K" gesture
const SecondKDescription = new GestureDescription('k2');

// Hand position config
SecondKDescription.addHandPosition(HandPosition.VerticalUp);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  SecondKDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0)
  SecondKDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  SecondKDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle]) {
  SecondKDescription.addCurl(finger, FingerCurl.NoCurl, 1.0)
}

// Fingers config
for (let finger of [Finger.Ring, Finger.Pinky]) {
  SecondKDescription.addCurl(finger, FingerCurl.FullCurl, 1.0)
}



export default [
  FirstKDescription,
  SecondKDescription
];
