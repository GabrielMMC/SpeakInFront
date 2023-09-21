import { Finger, FingerCurl, FingerDirection, HandDirection, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const ADescription = new GestureDescription('a');

ADescription.addHandDirection(HandDirection.FrontHand)

ADescription.addHandPosition(HandPosition.VerticalUp)

// thumb:
ADescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ADescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
ADescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ADescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ADescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  ADescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  ADescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default ADescription;