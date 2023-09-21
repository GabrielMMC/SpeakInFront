import { Finger, FingerCurl, FingerDirection, MovementDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// Describe "W" gesture
const WDescription = new GestureDescription('w');

// Movement direction config
WDescription.addMovementDirection(MovementDirection.VerticalUp);

// Thumb config
WDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
WDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
WDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
WDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Index config
WDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
WDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
WDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
WDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Middle config
WDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
WDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
WDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
WDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

// Ring config
WDescription.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
WDescription.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
WDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);
WDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

// Pinky config
WDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
WDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);

export default WDescription;
