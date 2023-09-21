import { Finger, FingerCurl, FingerDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';

// Describe "Y" gesture
const YDescription = new GestureDescription('y');

// Hand profundity config
YDescription.addProfundity(ProfundityDirection.Depth)

// Thumb config
YDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
YDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
YDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Pinky config
YDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
YDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);

// Fingers config
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  YDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  YDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  YDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  YDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default YDescription;
