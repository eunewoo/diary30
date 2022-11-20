import Topnav from './nav';

function profile() {
    return(
        <>
            <Topnav />
            
            <form>
                <p>Edit Profile</p>
                <div>
                    <p>Profile Photo</p>
                    <img></img>
                    <button>Choose new image</button>
                    <button>Remove image</button>
                </div>
                <div>
                    <label>Name</label>
                    <input></input>
                </div>
                <div>
                    <label>Email</label>
                    <input></input>
                </div>
                <div>
                    <label></label>
                    <input></input>
                    <input></input>
                </div>
                <button>Save</button>
                <button>Logout</button>
            </form>
        </>
    );
} export default profile;