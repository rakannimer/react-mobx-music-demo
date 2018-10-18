import * as React from "react";
import { transpose, scale } from "tonal-core";
import { observer } from "mobx-react";
import { getOctaveFromNote } from "./utils";
import { Note, NoteProps } from "./Note";
import { octaveToKeyBindings } from "./utils";
import { Instrument } from "./types";
import { toJS } from "mobx";
export type ScaleProps = {
  playingNotes?: Map<string, any>;
  instrument: Instrument;
  note: string;
  octave?: number;
  name: string;
  renderNote?: NoteProps["renderNote"];
  ScaleRow?: any;
};
export const Scale: React.StatelessComponent<ScaleProps> = observer(
  ({
    instrument,
    playingNotes = new Map(),
    name = "minor",
    note = "C",
    octave = 3,
    renderNote,
    ScaleRow = React.Fragment
  }: ScaleProps) => {
    const getScaleNotes = () => scale(name).map(transpose(`${note}${octave}`));
    for (let key of playingNotes.keys()) {
      console.warn(key);
    }

    return (
      <ScaleRow>
        {getScaleNotes().map((noteName, i) => (
          <Note
            name={noteName as string}
            key={noteName as string}
            instrument={instrument}
            bindTo={
              octaveToKeyBindings(getOctaveFromNote(noteName as string))[i]
            }
            renderNote={renderNote}
            isPlaying={playingNotes.has(noteName)}
          />
        ))}
      </ScaleRow>
    );
  }
);
