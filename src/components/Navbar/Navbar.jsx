import { useTranslation } from 'react-i18next';
import i18next from "i18next";

import { Link } from 'react-router-dom'
import { FaGlobe } from "react-icons/fa";

import "../../styles/Navbar/Navbar.scss"

const Navbar = () => {

    const { t } = useTranslation();

    const changeLanguage = () => {
        const lang = i18next.language === 'pl' ? 'en' : 'pl';
        i18next.changeLanguage(lang);
        localStorage.setItem('language', lang);
    }

    return (
        <div className="navbar">
            <div className="navbarSection">
                <div className="navbarItem navbarItem--large navbarItem-link">
                    <Link to="/">
                        {t('navbar.nonograms')}
                    </Link>
                </div>
            </div>
            <div className="navbarSection">
                <div className="navbarItem navbarItem-link">
                    <Link to="/levels">{t('navbar.levels')}</Link>
                </div>
                <div className="navbarItem navbarItem-link">
                    <Link to="/about">{t('navbar.about')}</Link>
                </div>
                <div className="navbarItem languageIcon">
                    <FaGlobe
                        onClick={() => changeLanguage()}
                        title={t('navbar.language')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar;