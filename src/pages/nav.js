import { Link } from 'react-router-dom';

function topnav({selected}) {
    return(
        <div>
            <div id="navWrapper">
                <p id="navTitle">Day Logger</p>
                <div id="linksWrapper">
                    <Link to="/log" id={selected === 'log' ? "selected" : ""}>Log Day</Link>
                    <Link to="/edit" id={selected === 'edit' ? "selected" : ""}>Edit Questions</Link>
                    <Link to="/view" id={selected === 'view' ? "selected" : ""}>View Data</Link>
                </div>
                <Link id="navProfile" to="/profile"><img src="/logo192.png" alt="mockup profile"/></Link>
            </div>
        </div>
    );
} export default topnav;