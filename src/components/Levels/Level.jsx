import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import "../../styles/Levels/Level.scss";
import "../../styles/common/Button.scss";
import "../../styles/common/Structure.scss";


const Level = ({ levelName, nonogram }) => {

    const { t } = useTranslation();

    const getNonogramRows = (nonogram) => {
        return nonogram.length;
    }

    const getNonogramCols = (nonogram) => {
        return nonogram[0].length;
    }

    return (
        <div className="levelContainer">
            <div className="levelHeader">
                <h1>{levelName}</h1>
            </div>
            <div className="levelData">
                <div className="levelDataItem">
                    <span>{t('levels.rows')}:</span>
                    <h2>{getNonogramRows(nonogram)}</h2>
                </div>
                <div className="levelDataItem">
                    <span>{t('levels.columns')}:</span>
                    <h2>{getNonogramCols(nonogram)}</h2>
                </div>
            </div>
            <Link to={`/play/${levelName}`} className="levelLink">
                <button className="button button--secondary button--large">
                    {t('levels.play')}
                </button>
            </Link>
        </div>
    )
}

export default Level