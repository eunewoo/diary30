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
        //it should fetch and change
        //but for testing i will use just set function
        if (/\S+@\S+\.\S+/.test(email)) {
            props.changeProfile({
                profile: img,
                name: name,
                email: email,
                address1: address1,
                address2: address2
            });
        }else {
            alert("Your email is not valid!\nYour profile has not been changed");
        }
        //this doesn't show the right information at the first time.
        console.log(props.profile);
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
                    <input type='text' id='name' defaultValue={props.profile.name} onChange={setUsername}></input>
                </div>
                <div>
                    <label htmlFor='email' >Email</label>
                    <input type='email' id='email' defaultValue={props.profile.email} onChange={setEmailAddress}></input>
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" id='address1' defaultValue={props.profile.address1} onChange={setAddress1f}></input>
                    <input type="text" id='address2' defaultValue={props.profile.address2} onChange={setAddress2f}></input>
                </div>
                <button type='button' onClick={setProfile}>Save</button>
                <button type='button'>Logout</button>
            </form>
        </>
    );
}