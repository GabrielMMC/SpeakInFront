import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandMap } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "V" gesture
const VDescription = new GestureDescription('v');

// finger spacing
VDescription.addFingerSpacing(HandMap.Index, HandMap.Middle, FingerSpacing.Far, 1.0);

// thumb:
VDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
VDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
VDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
VDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index: 
VDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
VDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
VDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
VDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
VDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
VDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
VDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
VDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
VDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
VDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
VDescription.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
VDescription.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
VDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
VDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
VDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
VDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default VDescription;
