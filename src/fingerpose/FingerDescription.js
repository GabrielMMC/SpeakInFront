const Finger = {

  Thumb: 0,
  Index: 1,
  Middle: 2,
  Ring: 3,
  Pinky: 4,

  // just for convenience
  all: [0, 1, 2, 3, 4],

  nameMapping: {
    0: 'Thumb',
    1: 'Index',
    2: 'Middle',
    3: 'Ring',
    4: 'Pinky'
  },

  // Describes mapping of joints based on the 21 points returned by handpose.
  // Handpose indexes are defined as follows:
  // (all fingers use last index as "finger tip")
  // ---------------------------------------------------------------------------
  // [0]     Palm
  // [1-4]   Thumb
  // [5-8]   Index
  // [9-12]  Middle
  // [13-16] Ring
  // [17-20] Pinky
  pointsMapping: {
    0: [[0, 1], [1, 2], [2, 3], [3, 4]],
    1: [[0, 5], [5, 6], [6, 7], [7, 8]],
    2: [[0, 9], [9, 10], [10, 11], [11, 12]],
    3: [[0, 13], [13, 14], [14, 15], [15, 16]],
    4: [[0, 17], [17, 18], [18, 19], [19, 20]],
  },

  getName: function (value) {
    return (typeof this.nameMapping[value] !== undefined) ?
      this.nameMapping[value] : false;
  },

  getPoints: function (value) {
    return (typeof this.pointsMapping[value] !== undefined) ?
      this.pointsMapping[value] : false;
  },
}

const FingerCurl = {

  NoCurl: 0,
  HalfCurl: 1,
  FullCurl: 2,

  nameMapping: {
    0: 'No Curl',
    1: 'Half Curl',
    2: 'Full Curl'
  },

  getName: function (value) {
    return (typeof this.nameMapping[value] !== undefined) ?
      this.nameMapping[value] : false;
  },

};

const FingerDirection = {

  VerticalUp: 0,
  VerticalDown: 1,
  HorizontalLeft: 2,
  HorizontalRight: 3,
  DiagonalUpRight: 4,
  DiagonalUpLeft: 5,
  DiagonalDownRight: 6,
  DiagonalDownLeft: 7,

  nameMapping: {
    0: 'Vertical Up',
    1: 'Vertical Down',
    2: 'Horizontal Left',
    3: 'Horizontal Right',
    4: 'Diagonal Up Right',
    5: 'Diagonal Up Left',
    6: 'Diagonal Down Right',
    7: 'Diagonal Down Left',
  },

  getName: function (value) {
    return (typeof this.nameMapping[value] !== undefined) ?
      this.nameMapping[value] : false;
  },
};

const HandDirection = {

  FrontHand: 0,
  BackHand: 1,

  nameMapping: {
    0: 'Front Hand',
    1: 'Back Hand'
  },

  getName: function (value) {
    return (typeof this.nameMapping[value] !== undefined) ?
      this.nameMapping[value] : false;
  },
};

const HandPosition = {

  VerticalUp: 0,
  VerticalDown: 1,
  HorizontalLeft: 2,
  HorizontalRight: 3,
  DiagonalUpRight: 4,
  DiagonalUpLeft: 5,
  DiagonalDownRight: 6,
  DiagonalDownLeft: 7,

  nameMapping: {
    0: 'Vertical Up',
    1: 'Vertical Down',
    2: 'Horizontal Left',
    3: 'Horizontal Right',
    4: 'Diagonal Up Right',
    5: 'Diagonal Up Left',
    6: 'Diagonal Down Right',
    7: 'Diagonal Down Left',
  },

  getName: function (value) {
    return (typeof this.nameMapping[value] !== undefined) ?
      this.nameMapping[value] : false;
  },
};

const MovementDirection = {

  Static: 0,
  VerticalUp: 1,
  VerticalDown: 2,
  HorizontalLeft: 3,
  HorizontalRight: 4,
  DiagonalUpRight: 5,
  DiagonalUpLeft: 6,
  DiagonalDownRight: 7,
  DiagonalDownLeft: 8,

  nameMapping: {
    0: 'Static',
    1: 'Vertical Up',
    2: 'Vertical Down',
    3: 'Horizontal Left',
    4: 'Horizontal Right',
    5: 'Diagonal Up Right',
    6: 'Diagonal Up Left',
    7: 'Diagonal Down Right',
    8: 'Diagonal Down Left',
  },

  getName: function (value) {
    return (typeof this.nameMapping[value] !== undefined) ?
      this.nameMapping[value] : false;
  },
};

const ProfundityDirection = {

  Depth: 0,
  Static: 1,
  Shallowness: 2,

  nameMapping: {
    0: 'Depth',
    1: 'Static',
    2: 'Shallowness',
  },

  getName: function (value) {
    return (typeof this.nameMapping[value] !== undefined) ?
      this.nameMapping[value] : false;
  },
};

const HandMap = {
  Palm: 0,
  Thumb: {
    Top: [1, 2, 3, 4][3],
    Mid: [1, 2, 3, 4][1],
    Base: [1, 2, 3, 4][0]
  },
  Index: {
    Top: [5, 6, 7, 8][3],
    Mid: [5, 6, 7, 8][1],
    Base: [5, 6, 7, 8][0]
  },
  Middle: {
    Top: [9, 10, 11, 12][3],
    Mid: [9, 10, 11, 12][1],
    Base: [9, 10, 11, 12][0]
  },
  Ring: {
    Top: [13, 14, 15, 16][3],
    Mid: [13, 14, 15, 16][1],
    Base: [13, 14, 15, 16][0]
  },
  Pinky: {
    Top: [17, 18, 19, 20][3],
    Mid: [17, 18, 19, 20][1],
    Base: [17, 18, 19, 20][0]
  }
};

const FingerSpacing = {
  Crossed: 0,
  Close: 1,
  Far: 2,
};

const Distance = {
  Close: 0,
  Moderate: 1,
  Far: 2,
  VeryFar: 3,
};

export {
  Finger, FingerCurl, FingerDirection, HandDirection, HandPosition, MovementDirection, ProfundityDirection, Distance, FingerSpacing, HandMap
}
