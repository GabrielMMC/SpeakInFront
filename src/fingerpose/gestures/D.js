import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandDirection, HandMap, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "D" gesture
const DDescription = new GestureDescription('d');

// Finger spacing config
DDescription.addFingerSpacing(HandMap.Thumb, HandMap.Middle, FingerSpacing.Close, 1.0);

// Index config:
DDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
DDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// Middle config:
DDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
DDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  DDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  DDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  DDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  DDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
}

export default DDescription;