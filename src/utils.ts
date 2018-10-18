export const octaveToKeyBindings = (octave: number) => {
  switch (octave) {
    case 2: {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];
    }
    case 3: {
      return ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
    }
    case 4: {
      return ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
    }
    case 5: {
      return ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
    }
    default: {
      return [];
    }
  }
};
export const getOctaveFromNote = (noteName: string) => {
  return parseInt(noteName[noteName.length - 1], 10);
};
