import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "M" gesture
const MDescription = new GestureDescription('m');

// Thumb config
MDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
MDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
MDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// Pinky config
MDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  MDescription.addDirection(finger, FingerDirection.VerticalDown, 1.0);
  MDescription.addDirection(finger, FingerDirection.DiagonalDownLeft, 1.0);
  MDescription.addDirection(finger, FingerDirection.DiagonalDownRight, 1.0);
}

// Fingers config
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  MDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
}

export default MDescription;