import * as React from "react";
import ReactKeyMaster from "react-keymaster";
import { observer } from "mobx-react";

import { Instrument } from "./types";

export type NoteProps = {
  key?: string;
  instrument: Instrument;
  name: string;
  bindTo?: string;
  isPlaying?: boolean;
  renderNote?: ((
    {
      instrument,
      noteName,
      bindTo
    }: {
      instrument: Instrument;
      noteName: string;
      bindTo: string;
      isPlaying: boolean;
    }
  ) => any);
};

export const defaultRenderNote: NoteProps["renderNote"] = ({
  instrument,
  noteName,
  bindTo,
  isPlaying
}) => (
  <button
    onMouseDown={() => {
      instrument.play(noteName, { gain: 10 });
    }}
    onMouseUp={() => {
      instrument.stop(noteName);
    }}
    style={{
      margin: 10,
      width: 100,
      height: 100
    }}
  >
    {bindTo} Play {noteName}
    {isPlaying ? "playing" : ""}
  </button>
);

export const Note = observer(
  ({
    instrument,
    name,
    bindTo = "",
    renderNote = defaultRenderNote,
    isPlaying = false
  }: NoteProps) => {
    return (
      <React.Fragment>
        {bindTo && (
          <ReactKeyMaster
            keyName={bindTo}
            onKeyDown={() => {
              console.warn("keydown");
              instrument.play(name, { gain: 10 });
            }}
            onKeyUp={() => {
              console.warn("keyup");
              instrument.stop(name);
            }}
          />
        )}
        {renderNote({ instrument, noteName: name, bindTo, isPlaying })}
      </React.Fragment>
    );
  }
);
