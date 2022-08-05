import "../../styles/Levels/Level.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


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
            <div className="levelLinkButton">
                <Link to={`/play/${levelName}`}>
                    <button>{t('levels.play')}</button>
                </Link>
            </div>
        </div>
    )
}

export default Level