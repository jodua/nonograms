import { Link } from 'react-router-dom'
import "../../styles/Homepage/Homepage.scss"
import { useTranslation } from 'react-i18next';

const Homepage = () => {

    const { t } = useTranslation();

    return (
        <div className="homepageContainer">
            <div className="homepageCenter">
                <div className="homepageCenterTitle">
                    {t('homepage.title')}
                </div>
                <div className="homepageCenterSubtitle">
                    {t('homepage.subtitle')}
                </div>
                <div className="homepageCenterButtonContainer">
                    <Link to="/levels">
                        <button className="homepageCenterButton">
                            {t('homepage.button')}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Homepage