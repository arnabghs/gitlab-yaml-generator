import React, {useEffect} from "react";
import {MultiOptionSelector, StageOptions} from "../shared/StageOptions";
import {SelectChangeEvent} from "@mui/material";


const Envs = [
    'DEV',
    'QA',
    'NFT',
    'PRE-PROD',
    'PROD'
];

const DeployOptions = ({setDeployParams}: any) => {
    const [envs, setEnvs] = React.useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent<typeof envs>,) => {
        const {target: {value}} = event;
        setEnvs(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setDeployParams([...envs])
    }, [envs, setDeployParams])

    return (
        <StageOptions stageName={"Deploy"}>
            <MultiOptionSelector availableOptions={Envs} selectedOptions={envs} handleChange={handleChange}
                                 label={"Env"}/>
        </StageOptions>
    )
}

export {DeployOptions}
