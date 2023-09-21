import { Finger, FingerCurl, FingerDirection, HandPosition, MovementDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "X" gesture
const XDescription = new GestureDescription('x');

// Hand position config
XDescription.addHandPosition(HandPosition.DiagonalUpRight)

// Movement direction config
XDescription.addMovementDirection(MovementDirection.DiagonalDownLeft);

// Thumb config
XDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
XDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
XDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Index config
XDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
XDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
XDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Middle config
XDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  XDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  XDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  XDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

export default XDescription;
