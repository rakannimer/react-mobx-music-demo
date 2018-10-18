import * as React from "react";
import { getInstrumentNames } from "mobx-music";
import AutoComplete from "./AutoComplete";
import { Scale as S, Note as N } from "tonal-core";

export const InputForm = ({ state, setState }: any) => {
  return (
    <React.Fragment>
      <AutoComplete
        label="Note : "
        initial={state.note}
        items={N.names()}
        onChange={name => {
          setState({ scale: name });
        }}
      />
      <AutoComplete
        label="Scale : "
        initial={state.scale}
        items={S.names()}
        onChange={name => {
          setState({ scale: name });
        }}
      />
      <AutoComplete
        label="Instrument : "
        initial={state.instrument}
        items={getInstrumentNames()}
        onChange={name => {
          setState({ instrument: name });
        }}
      />
      <button> Record</button>
    </React.Fragment>
  );
};
