import { Finger, FingerCurl, FingerDirection, FingerSpacing, HandDirection, HandMap, HandPosition, MovementDirection, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const InitialHDescription = new GestureDescription('h');

// Hand direction config
InitialHDescription.addHandDirection(HandDirection.FrontHand);

// Hand position config
InitialHDescription.addHandPosition(HandPosition.VerticalUp);

// Profundity config
InitialHDescription.addProfundity(ProfundityDirection.Static);

// Finger spacing config
InitialHDescription.addFingerSpacing(HandMap.Index, HandMap.Middle, FingerSpacing.Far, 1.0);

// Thumb config
InitialHDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

// Index config
InitialHDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);

// Middle config
InitialHDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// Ring config
InitialHDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

// Pinky config
InitialHDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  InitialHDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  InitialHDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  InitialHDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}


// describe victory gesture ✌️
const EndHDescription = new GestureDescription('h');

// Hand direction config
EndHDescription.addHandDirection(HandDirection.BackHand);

// Hand position config
EndHDescription.addHandPosition(HandPosition.VerticalUp);
EndHDescription.addHandPosition(HandPosition.DiagonalUpLeft);
EndHDescription.addHandPosition(HandPosition.DiagonalUpRight);

// Profundity config
EndHDescription.addProfundity(ProfundityDirection.Static);

// Finger spacing config
EndHDescription.addFingerSpacing(HandMap.Index, HandMap.Middle, FingerSpacing.Far, 1.0);

// Thumb config
EndHDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
EndHDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

// Index config
EndHDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
EndHDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);

// Middle config
EndHDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
EndHDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);

// Ring config
EndHDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

// Pinky config
EndHDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

// Fingers config
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  EndHDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  EndHDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  EndHDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default [
  InitialHDescription,
  EndHDescription
]

// export default InitialHDescription

