import { atom, selector } from "recoil";

export const DisplayImageAtom = atom({
  key: "displayImage",
  default: "",
});

export const returneeState = atom({
  key: "returneeState",
  default: [],
});

export const questionsState = atom({
  key: "questionsState",
  default: [],
});

export const questionsSelector = selector({
  key: "questionsSelector",
  get: ({ get }) => get(questionsState),
  set: ({ set }, newValue) => {
    set(questionsState, newValue);
  },
});

const cum_date = new Date();
export const cumDateState = atom({
  key: "cumDateState",
  default: { 
    cum_year: cum_date.getFullYear(), 
    cum_month: cum_date.getMonth() + 1, 
    cum_day: cum_date.getDate() },
});
