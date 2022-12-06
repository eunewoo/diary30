import { Link } from 'react-router-dom';

function topnav(props) {
    return(
        <div>
            <div>
                <p>Day Logger</p>
                <Link to="/log2">Log Day</Link>
                <Link to="/edit">Edit Questions</Link>
                <Link to="/view">View Data</Link>
                <Link to="/profile"><img></img>profile</Link>
            </div>
        </div>
    );
} export default topnav;