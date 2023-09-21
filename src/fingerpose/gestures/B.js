import { Finger, FingerCurl, FingerDirection, HandDirection, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const BDescription = new GestureDescription('b');

BDescription.addHandPosition(HandPosition.VerticalUp)

// thumb:
BDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
BDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
BDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
BDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  BDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  BDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

export default BDescription;