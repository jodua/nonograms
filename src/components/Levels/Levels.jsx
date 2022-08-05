import { useTranslation } from 'react-i18next';
import "../../styles/Levels/Levels.scss";
import Level from './Level';
import levels from "../../nonogram-mock"


const Levels = () => {

    const { t } = useTranslation();

    return (
        <div className="levelsContainer">
            <div className="levelsCenter">
                <div className="levelsCenterTitle">
                    <h1>{t('levels.title')}</h1>
                </div>
                <div className="levelsCenterSubtitle">
                    <h2>{t('levels.subtitle')}</h2>
                </div>
                <div className="levelsCenterList">
                    {Object.keys(levels).map((levelName) => {
                        return <Level key={levelName} levelName={levelName} nonogram={levels[levelName]} />
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Levels