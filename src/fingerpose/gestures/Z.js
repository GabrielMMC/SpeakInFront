import { Finger, FingerCurl, FingerDirection, MovementDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "Z" gesture
const ZDescription = new GestureDescription('z');

// Movement config
ZDescription.addMovementDirection(MovementDirection.HorizontalRight)
ZDescription.addMovementDirection(MovementDirection.DiagonalDownLeft)
ZDescription.addMovementDirection(MovementDirection.HorizontalRight)

// Thumb config
ZDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ZDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
ZDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
ZDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Index config
ZDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ZDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
ZDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
ZDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Fingers config
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  ZDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ZDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  ZDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  ZDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default ZDescription;
