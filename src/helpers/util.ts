import {Stage, StageProps} from "../data/data";

const getStageByName = (stages: StageProps[], name: Stage): StageProps => {
    return stages.filter(st => st.name === name)[0]
}

export {getStageByName}
