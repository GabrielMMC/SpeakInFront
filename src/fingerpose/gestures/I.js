import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandDirection, HandMap, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe "I" gesture
const IDescription = new GestureDescription('i');

// Hand position config
IDescription.addHandPosition(HandPosition.VerticalUp);

// Thumb config
IDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
IDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
IDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
IDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Pinky config
IDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
IDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

// Fingers config
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  IDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  IDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  IDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  IDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default IDescription;