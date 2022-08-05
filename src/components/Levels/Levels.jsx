import { useTranslation } from 'react-i18next';
import levels from "../../nonogram-mock"

import Level from './Level';

import "../../styles/Levels/Levels.scss";
import "../../styles/common/Structure.scss";


const Levels = () => {

    const { t } = useTranslation();

    return (
        <div className="mainContainer">
            <div className="centeredContainer container--half">
                <div className="title">
                    <h1>{t('levels.title')}</h1>
                </div>
                <div className="subtitle">
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