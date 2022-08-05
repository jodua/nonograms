import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom'

import "../../styles/common/Button.scss"
import "../../styles/common/Structure.scss"

const About = () => {

    const { t } = useTranslation();

    return (
        <div className="mainContainer">
            <div className="centeredContainer container--half container--spaced">
                <div className="title title--medium">
                    {t('about.title')}
                </div>
                <div className="section">
                    <div className="subtitle">
                        {t('about.content.title')}
                    </div>
                    <div className="">
                        {t('about.content.text')}
                    </div>
                    <div className="subtitle">
                        {t('about.content.author.title')}
                    </div>
                    <div className="">
                        {t('about.content.author.content')}
                        <a href="
                        https://github.com/jodua
                        ">Wojciech Pietruszewski</a>
                    </div>

                </div>
                <Link to="/">
                    <button className="button">
                        {t('buttons.homepage')}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default About