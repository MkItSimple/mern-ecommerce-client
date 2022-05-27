import React, { useState } from "react";
import { useApp } from "../states/AppContext";
import { Sort } from "../types";
import { SortingSelectionStyles } from "./SortingSelectionStyles";

const SortingSelection = () => {
  const {setSort} = useApp();
  const options = [Sort.SORT, Sort.BEST_SELLING, Sort.A_TO_Z, Sort.Z_TO_A, Sort.PRICE_LOW_TO_HIGH, Sort.PRICE_HIGH_TO_LOW];
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<string>(Sort.SORT);
  const setValueHandler = (value: string) => {
    setSort(value)
    setValue(value);
    setOpen(!open);
  };
  
  const onClickHandler = () => {
    setOpen(!open);
  };

  return (
    <SortingSelectionStyles>
      <div
        className={`regular select ${open ? "open" : ""}`}
        onClick={onClickHandler}
        // onBlur={() => setOpen(false)}
      >
        <span>{value}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={() => {}}
          className="sorting_input"
        />

        <ul className="sorting_list">
          {options.map((option) => (
            <li key={option} onClick={() => setValueHandler(option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </SortingSelectionStyles>
  );
};

export default SortingSelection;
