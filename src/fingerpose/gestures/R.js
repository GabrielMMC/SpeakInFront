import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandMap } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "R" gesture
const RDescription = new GestureDescription('r');

// Finger spacing
RDescription.addFingerSpacing(HandMap.Index, HandMap.Middle, FingerSpacing.Crossed, 1.0);

// Thumb config
RDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
RDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
RDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
RDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
RDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Index config
RDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
RDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
RDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
RDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Middle config
RDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
RDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
RDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
RDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

// Ring config
RDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

// Pinky config
RDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

export default RDescription;
