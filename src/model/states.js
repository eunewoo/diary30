import { atom, selector } from "recoil";

export const DisplayImageAtom = atom({
  key: "displayImage",
  default: "",
});

// make cloudinary form for Register.js and Profile.js
export function makeFormData(e) {
  const img = e.target.files[0];

  const formData = new FormData();
  formData.append("file", img);
  formData.append("api_key", "672365852293431");
  formData.append("upload_preset", "tdc1f5a8");
  formData.append("timestamp", (Date.now() / 1000) | 0);
  console.log(formData);

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return { formData, config };
}
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
    cum_day: cum_date.getDate(),
  },
});

export function isAuthenticated(props, navigate) {
  if (props.profile.user_id == "") {
    alert(
      "not a valid path - please log in first. \n(note: redirection(F5) is not allowed) "
    );
    navigate("/");
  }
}
