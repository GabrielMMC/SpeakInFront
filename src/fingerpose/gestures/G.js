import { Finger, FingerCurl, FingerDirection, HandPosition, MovementDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "G" gesture
const GDescription = new GestureDescription('g');

// Hand position config
GDescription.addHandPosition(HandPosition.VerticalUp);

// Fingers config
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  GDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  GDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  GDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  GDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index]) {
  GDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  GDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  GDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  GDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default GDescription;