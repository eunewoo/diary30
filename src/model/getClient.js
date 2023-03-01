import Axios from "axios";

import { useRecoilState, useRecoilValue } from "recoil";
import { DisplayImageAtom, makeFormData } from "../states";

export default function LoginClient(props) {
  const [displayImage, setDisplayImage] = useRecoilState(DisplayImageAtom);

  Axios.get(
    "http://127.0.0.1:5001/diary30wooserver/us-central1/app/api/users/" +
      login_id +
      ""
  ).then((response) => {
    props.ChangeProfile({
      password: password,
      user_id: response.data[0].user_id,
      profile: response.data[0].img,
      name: response.data[0].user_name,
      email: response.data[0].user_email,
      address1: response.data[0].address_f,
      address2: response.data[0].address_l,
      user_ref: response.data[0]._id,
    });
    setDisplayImage(() => response.data[0].img);
    //navigate("/log");
  });
}
