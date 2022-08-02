import { Link } from 'react-router-dom'
import "../../styles/Homepage/Homepage.scss"

const Homepage = () => {

    return (
        <div className="homepageContainer">
            <div className="homepageCenter">
                <div className="homepageCenterTitle">
                    NONOGRAMS
                </div>
                <div className="homepageCenterSubtitle">
                    Play nonograms for free
                </div>
                <div className="homepageCenterButtonContainer">
                    <Link to="/nonograms">
                        <button className="homepageCenterButton">
                            PLAY
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Homepage