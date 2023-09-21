import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "Q" gesture
const QDescription = new GestureDescription('q');

// Thumb config
QDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
QDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
QDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// Pinky config
QDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

// Ring config
QDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

// Middle config
QDescription.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  QDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
  QDescription.addDirection(finger, FingerDirection.DiagonalDownLeft, 1.0);
  QDescription.addDirection(finger, FingerDirection.DiagonalDownRight, 1.0);
}

// Fingers config
for (let finger of [Finger.Index]) {
  QDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
}

export default QDescription;