import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandMap, HandPosition } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "O" gesture
const ODescription = new GestureDescription('o');

// Hand position config
ODescription.addHandPosition(HandPosition.DiagonalUpLeft);
ODescription.addHandPosition(HandPosition.DiagonalUpRight);

// Finger spacing config
ODescription.addFingerSpacing(HandMap.Thumb, HandMap.Middle, FingerSpacing.Close, 1.0);

// Thumb config:
ODescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ODescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
ODescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ODescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  ODescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  ODescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default ODescription;