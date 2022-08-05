import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import "../../styles/Navbar/Navbar.scss"
import i18next from "i18next";

const Navbar = () => {

    const { t } = useTranslation();

    const changeLanguage = () => {
        const lang = i18next.language === 'pl' ? 'en' : 'pl';
        i18next.changeLanguage(lang);
        localStorage.setItem('language', lang);
    }


    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <div className="navbarLeftLogo">
                    {t('navbar.nonograms')}
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarRightItem">
                    <Link to="/">{t('navbar.home')}</Link>
                </div>
                <div className="navbarRightItem">
                    <Link to="/levels">{t('navbar.levels')}</Link>
                </div>
                <div className="navbarRightItem">
                    <Link to="/about">{t('navbar.about')}</Link>
                </div>
                <div className="navbarRightItem">
                    <span onClick={() => changeLanguage()}>{t('navbar.language')}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;