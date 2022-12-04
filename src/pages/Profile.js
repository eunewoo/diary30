import Axios from "axios";
import { useState } from "react";
import Topnav from './nav';

export default function Profile(props) {
    const [img, setImg] = useState(props.profile.img);
    const [name, setName] = useState(props.profile.name);
    const [email, setEmail] = useState(props.profile.email);
    const [address1, setAddress1] = useState(props.profile.address1);
    const [address2, setAddress2] = useState(props.profile.address2);

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
    const logout = () => {
        props.changeProfile({});
        document.location.href = 'http://localhost:3000/';

    }
    const saveProfile =(e) => {
        //it should fetch and change
        //but for testing i will use just set function
        if (/\S+@\S+\.\S+/.test(email)) {
            //post method
            Axios.put('http://localhost:3305/api/diary/users', {
                    user_id: props.profile.user_id,
                    profile: img,
                    name: name,
                    email: email,
                    address1: address1,
                    address2: address2
                }
            ).then((response)=>{
                if (response.status != 200) {
                    alert("Something went wrong in communicating DB!");
                } else {
                    props.changeProfile({
                        profile: img,
                        name: name,
                        email: email,
                        address1: address1,
                        address2: address2
                    });
                    alert("Your profile has been changed");
                }
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
                <button type='button' onClick={saveProfile}>Save</button>
                <button type='button' onClick={logout}>Logout</button>
            </form>
        </>
    );
}