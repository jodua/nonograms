import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom'

import "../../styles/common/Button.scss"
import "../../styles/common/Structure.scss"

const Homepage = () => {

    const { t } = useTranslation();

    return (
        <div className="mainContainer">
            <div className="centeredContainer container--full container--spaced">
                <div className="title">
                    {t('homepage.title')}
                </div>
                <div className="subtitle">
                    {t('homepage.subtitle')}
                </div>
                <div className="">
                    <Link to="/levels">
                        <button className="button button--large">
                            {t('homepage.button')}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Homepage