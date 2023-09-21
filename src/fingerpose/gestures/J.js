import { Finger, FingerCurl, FingerDirection, HandDirection, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';

// Describe first frame of "J" gesture
const FirstJDescription = new GestureDescription('j');

// Hand direction config
FirstJDescription.addHandDirection(HandDirection.FrontHand);

// Thumb config
FirstJDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
FirstJDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
FirstJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
FirstJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Pinky config
FirstJDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
FirstJDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

// Fingers config
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  FirstJDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  FirstJDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  FirstJDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  FirstJDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}


// Describe second frame of "J" gesture
const SecondJDescription = new GestureDescription('j2');

// Hand position config
SecondJDescription.addHandPosition(HandPosition.DiagonalUpLeft);
SecondJDescription.addHandPosition(HandPosition.HorizontalLeft);
SecondJDescription.addHandPosition(HandPosition.HorizontalRight);

// Thumb config
SecondJDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
SecondJDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
SecondJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
SecondJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Pinky config
SecondJDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
SecondJDescription.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);
SecondJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);
SecondJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  SecondJDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  SecondJDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  SecondJDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  SecondJDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  SecondJDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}


// Describe third frame of "J" gesture
const ThirdJDescription = new GestureDescription('j3');

// Hand direction config
ThirdJDescription.addHandDirection(HandDirection.BackHand);

// Thumb config
ThirdJDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ThirdJDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ThirdJDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
ThirdJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
ThirdJDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Pinky config
ThirdJDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
ThirdJDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
ThirdJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
ThirdJDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);

// Fingers config
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  ThirdJDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ThirdJDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  ThirdJDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  ThirdJDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default [
  FirstJDescription,
  SecondJDescription,
  ThirdJDescription
]
