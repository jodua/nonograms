import { Link } from 'react-router-dom'
import "../../styles/About/About.scss"
import { useTranslation } from 'react-i18next';

const About = () => {

    const { t } = useTranslation();

    return (
        <div className="aboutContainer">
            <div className="aboutCenter">
                <div className="aboutCenterTitle">
                    {t('about.title')}
                </div>
                <div className="aboutCenterSection">
                    <div className="aboutCenterSectionTitle">
                        {t('about.content.title')}
                    </div>
                    <div className="aboutCenterSectionText">
                        {t('about.content.text')}
                    </div>
                    <div className="aboutCenterSectionTitle">
                        {t('about.content.author.title')}
                    </div>
                    <div className="aboutCenterSectionText">
                        {t('about.content.author.content')}
                        <a href="
                        https://github.com/jodua
                        ">Wojciech Pietruszewski</a>
                    </div>

                </div>
                <div className="aboutCenterButtonContainer">
                    <Link to="/">
                        <button className="homepageButton">
                            {t('buttons.homepage')}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About