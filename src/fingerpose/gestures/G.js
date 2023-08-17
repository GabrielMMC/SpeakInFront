import { Finger, FingerCurl, FingerDirection, HandDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const GDescription = new GestureDescription('g');

GDescription.addHandDirection(HandDirection.FrontHand);

// thumb:
GDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
GDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
GDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
GDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// index:
GDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
GDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
GDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
GDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  GDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  GDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  GDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  GDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  GDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default GDescription;
