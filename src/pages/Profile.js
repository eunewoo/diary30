import { useState } from "react";
import Topnav from './nav';

export default function Profile(props) {
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const setProfilePicture =(e) => {
    }
    const setUsername =(e) => {
        setName(e.target.value);
    }
    const setEmailAddress =(e) => {
        setEmail(e.target.value);
    }
    const setAddress1f =(e) => {
        setAddress1(e.target.value);
    }
    const setAddress2f =(e) => {
        setAddress2(e.target.value);
    }
    const setProfile =(e) => {
        console.log(img,name,email,address1,address2);
    }

    return(
        <>
            <Topnav />
            <form>
                <p>Edit Profile</p>
                <div>
                    <p>Profile Photo</p>
                    <img></img>
                    <button type='button'>Choose new image</button>
                    <button type='button'>Remove image</button>
                </div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' onChange={setUsername}></input>
                </div>
                <div>
                    <label htmlFor='email' >Email</label>
                    <input type='email' id='email' onChange={setEmailAddress}></input>
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" id='address1' onChange={setAddress1f}></input>
                    <input type="text" id='address2' onChange={setAddress2f}></input>
                </div>
                <button type='button' onClick={setProfile}>Save</button>
                <button type='button'>Logout</button>
            </form>
        </>
    );
}