import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "F" gesture
const FDescription = new GestureDescription('f');

// Thumb config
FDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
FDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
FDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// Index config
FDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
FDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
FDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Middle config
FDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
FDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
FDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
FDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

// Fingers config
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  FDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  FDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  FDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
}

export default FDescription;