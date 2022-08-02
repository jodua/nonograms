import { Link } from 'react-router-dom'
import "../../styles/About/About.scss"

const About = () => {
    return (
        <div className="aboutContainer">
            <div className="aboutCenter">
                <div className="aboutCenterTitle">
                    About nonograms
                </div>
                <div className="aboutCenterSection">
                    <div className="aboutCenterSectionTitle">
                        What are nonograms?
                    </div>
                    <div className="aboutCenterSectionText">
                        Nonograms are a puzzle game that is used to test your ability to solve a problem.
                    </div>
                    <div className="aboutCenterSectionTitle">
                        Author
                    </div>
                    <div className="aboutCenterSectionText">
                        This game was created by <a href="
                        https://github.com/jodua
                        ">Wojciech Pietruszewski</a>
                    </div>

                </div>
                <div className="aboutCenterButtonContainer">
                    <Link to="/">
                        <button className="homepageButton">
                            Back to homepage
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About