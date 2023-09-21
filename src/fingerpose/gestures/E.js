import { Finger, FingerCurl, FingerDirection, HandDirection, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const EDescription = new GestureDescription('e');

EDescription.addHandPosition(HandPosition.VerticalUp)

for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  EDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  EDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  EDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

export default EDescription;