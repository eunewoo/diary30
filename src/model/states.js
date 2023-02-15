import { atom } from "recoil";

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
