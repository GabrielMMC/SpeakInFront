import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "N" gesture
const NDescription = new GestureDescription('n');

// Thumb config
NDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
NDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
NDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// Pinky config
NDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

// Ring config
NDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  NDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
  NDescription.addDirection(finger, FingerDirection.DiagonalDownLeft, 1.0);
  NDescription.addDirection(finger, FingerDirection.DiagonalDownRight, 1.0);
}

// Fingers config
for (let finger of [Finger.Index, Finger.Middle]) {
  NDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
}

export default NDescription;