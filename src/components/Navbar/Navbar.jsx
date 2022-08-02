import { Link } from 'react-router-dom'
import "../../styles/Navbar/Navbar.scss"

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <div className="navbarLeftLogo">
                    NONOGRAMS
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarRightItem">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbarRightItem">
                    <Link to="/about">About</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;