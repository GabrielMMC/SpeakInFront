import { Distance, Finger, FingerCurl, FingerDirection, HandDirection, HandMap, ProfundityDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe first help gesture
const FirstHandHelpDescription = new GestureDescription('help');

FirstHandHelpDescription.addHandDirection(HandDirection.FrontHand);

// FirstHandHelpDescription.addProfundity(ProfundityDirection.Shallowness);

// index:
FirstHandHelpDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);

for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  FirstHandHelpDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  FirstHandHelpDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  FirstHandHelpDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  FirstHandHelpDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);

}

// describe second help gesture
const SecondHandHelpDescription = new GestureDescription('help');

SecondHandHelpDescription.addHandDirection(HandDirection.BackHand);

// SecondHandHelpDescription.addProfundity(ProfundityDirection.Shallowness);

SecondHandHelpDescription.addHandDistance(HandMap.Index.Top, HandMap.Palm, Distance.Close);

SecondHandHelpDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  SecondHandHelpDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  SecondHandHelpDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

for (let finger of [Finger.Thumb, Finger.Index]) {
  SecondHandHelpDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  SecondHandHelpDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  SecondHandHelpDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
}

export default {
  signals: [FirstHandHelpDescription, SecondHandHelpDescription],
  multiHands: true
}
