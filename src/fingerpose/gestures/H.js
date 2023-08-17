import { Finger, FingerCurl, FingerDirection, HandDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const InitialHDescription = new GestureDescription('h');

InitialHDescription.addHandDirection(HandDirection.FrontHand);

// thumb:
InitialHDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
InitialHDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
InitialHDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
InitialHDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
InitialHDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
InitialHDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
InitialHDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
InitialHDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
InitialHDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
InitialHDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
InitialHDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
InitialHDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
InitialHDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
InitialHDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
InitialHDescription.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
InitialHDescription.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
InitialHDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
InitialHDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
InitialHDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
InitialHDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);


// describe victory gesture ✌️
const EndHDescription = new GestureDescription('h');

EndHDescription.addHandDirection(HandDirection.BackHand);

// thumb:
EndHDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
EndHDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
EndHDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
EndHDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
EndHDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
EndHDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
EndHDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
EndHDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
EndHDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
EndHDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
EndHDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
EndHDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
EndHDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
EndHDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
EndHDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
EndHDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
EndHDescription.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
EndHDescription.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
EndHDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
EndHDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
EndHDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
EndHDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default [
  InitialHDescription,
  EndHDescription
]
