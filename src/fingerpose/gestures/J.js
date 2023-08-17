import { Finger, FingerCurl, FingerDirection, HandDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


const InitialJDescription = new GestureDescription('j');

//Initial J
// thumb:
InitialJDescription.addHandDirection(HandDirection.FrontHand);

InitialJDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
InitialJDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
InitialJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
InitialJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
InitialJDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// pinky:
InitialJDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
InitialJDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
InitialJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
InitialJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  InitialJDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  // InitialJDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  InitialJDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  InitialJDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  InitialJDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}


// Mid J
// thumb:
const MidJDescription = new GestureDescription('j');

MidJDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
MidJDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
MidJDescription.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
MidJDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
MidJDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);

// pinky:
MidJDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
MidJDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
MidJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
MidJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalDownLeft, 1.0);
MidJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalDownRight, 1.0);
MidJDescription.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0);
MidJDescription.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  MidJDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  MidJDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  MidJDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  MidJDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  MidJDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  MidJDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  MidJDescription.addDirection(finger, FingerDirection.DiagonalDownLeft, 1.0);
  MidJDescription.addDirection(finger, FingerDirection.DiagonalDownRight, 1.0);
}


// Ending J
const EndingJDescription = new GestureDescription('j');

EndingJDescription.addHandDirection(HandDirection.BackHand);

// thumb:
EndingJDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
EndingJDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
EndingJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
EndingJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
EndingJDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// pinky:
EndingJDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
EndingJDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
EndingJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);
EndingJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
EndingJDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  EndingJDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  EndingJDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  EndingJDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  EndingJDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  EndingJDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default [
  InitialJDescription,
  MidJDescription,
  EndingJDescription
]
