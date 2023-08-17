import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const LDescription = new GestureDescription('l');


// thumb:
LDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
LDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
LDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
LDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// index:
LDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
LDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
LDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
LDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  LDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  LDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  LDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  LDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  LDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default LDescription;
