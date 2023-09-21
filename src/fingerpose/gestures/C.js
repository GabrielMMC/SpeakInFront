import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandDirection, HandMap, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe "C" gesture
const CDescription = new GestureDescription('c');

// Hand direction config
CDescription.addHandDirection(HandDirection.FrontHand);

// Hand position config
CDescription.addHandPosition(HandPosition.DiagonalUpLeft);
CDescription.addHandPosition(HandPosition.DiagonalUpRight);

// Finger spacing config
CDescription.addFingerSpacing(HandMap.Thumb, HandMap.Index, FingerSpacing.Far, 1.0);

// Thumb config:
CDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
CDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
CDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// Fingers config
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  CDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  CDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  CDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

CDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);

export default CDescription;