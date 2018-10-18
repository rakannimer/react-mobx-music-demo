// here's an extremely bare bones example of an autocomplete
import * as React from "react";
import Downshift from "downshift";

// const ITEMS = [
//   { value: "apple" },
//   { value: "pear" },
//   { value: "orange" },
//   { value: "grape" },
//   { value: "banana" }
// ];

export type AutoCompleteProps<T> = {
  items: T[];
  onChange: (name: string) => void;
  label: string;
  initial: string;
};

function AutoComplete<T extends any>(props: AutoCompleteProps<T>) {
  const {
    items = [] as T[],
    onChange = (name: string) => {},
    label = "list",
    initial
  } = props;
  return (
    <Downshift
      onChange={onChange}
      // @ts-ignore
      initialInputValue={initial}
      itemToString={item => (item ? item : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <label {...getLabelProps()}>{label}</label>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(item => !inputValue || item.includes(inputValue))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        //@ts-ignore
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index
                              ? "lightgray"
                              : undefined,
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      {item}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}

export default AutoComplete;
