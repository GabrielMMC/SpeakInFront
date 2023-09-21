import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandMap, HandPosition } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "P" gesture
const PDescription = new GestureDescription('p');

// Hand position config
PDescription.addHandPosition(HandPosition.DiagonalUpRight);

// Thumb config:
PDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// Fingers config
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  PDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

for (let finger of [Finger.Thumb, Finger.Index,]) {
  PDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  PDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  PDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default PDescription;