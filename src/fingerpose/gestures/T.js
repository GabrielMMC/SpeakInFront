import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "T" gesture
const TDescription = new GestureDescription('t');

// Thumb config
TDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
TDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Index config
TDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
TDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
TDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Middle config
TDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
TDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
TDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
TDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

// Fingers config
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  TDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  TDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  TDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
}

export default TDescription;