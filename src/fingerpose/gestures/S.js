import { Finger, FingerCurl, FingerDirection, HandPosition } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "S" gesture
const SDescription = new GestureDescription('s');

// Hand position config
SDescription.addHandPosition(HandPosition.VerticalUp)

// Thumb config:
SDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
SDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
SDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
SDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  SDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  SDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  SDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  SDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default SDescription;