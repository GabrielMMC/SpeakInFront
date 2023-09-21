import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandMap } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "U" gesture
const UDescription = new GestureDescription('u');

// Finger spacing config
UDescription.addFingerSpacing(HandMap.Index, HandMap.Middle, FingerSpacing.Close, 1.0);

// Thumb config
UDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
UDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
UDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
UDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Index config
UDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
UDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
UDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
UDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Middle config
UDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
UDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
UDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
UDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

// Ring config
UDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

// Pinky config
UDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

export default UDescription;
