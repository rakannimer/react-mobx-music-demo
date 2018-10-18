import * as ReactDOM from "react-dom";
import * as React from "react";
import { InstrumentName, NotePlayer } from "mobx-music";
import ReactMobxMusic from "react-mobx-music";
import { Component } from "ts-component-component";
import { Scale } from "./Scale";
import { InputForm } from "./InputForm";

export const App = () => {
  return (
    <Component
      initialState={{
        instrument: "acoustic_grand_piano" as InstrumentName,
        scale: "minor",
        note: "C"
      }}
    >
      {({ state, setState }) => (
        <React.Fragment>
          <InputForm state={state} setState={setState} />
          <ReactMobxMusic instrumentNames={[state.instrument]}>
            {({ isLoading, instruments, playingNotes }) =>
              isLoading ? (
                <div>Loading instrument {state.instrument}</div>
              ) : (
                <div>
                  Loaded !
                  <Scale
                    instrument={instruments.get(state.instrument) as NotePlayer}
                    name={state.scale}
                    note={state.note}
                    octave={3}
                    playingNotes={playingNotes}
                  />
                  <Scale
                    instrument={instruments.get(state.instrument) as NotePlayer}
                    name={state.scale}
                    note={state.note}
                    octave={4}
                  />
                </div>
              )
            }
          </ReactMobxMusic>
        </React.Fragment>
      )}
    </Component>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
