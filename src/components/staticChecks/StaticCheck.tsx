import React, {Dispatch, SetStateAction} from "react";
import {StaticCheckJobName} from "../../data/data";
import {MultiOptionSelector, OptionsDropdown} from "../shared/OptionsDropdown";
import {SelectChangeEvent} from "@mui/material";

const Jobs: StaticCheckJobName[] = [
    'lint',
    'gemnasium-dependency_scanning'
];

const StaticCheckOptions = ({staticCheckParams, setStaticCheckParams}:
                                {
                                    staticCheckParams: StaticCheckJobName[],
                                    setStaticCheckParams: Dispatch<SetStateAction<StaticCheckJobName[]>>
                                }) => {

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        event.preventDefault()

        let v = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
        setStaticCheckParams(v as StaticCheckJobName[])
    };

    return (
        <OptionsDropdown stageName={"Static-Check"}>
            <MultiOptionSelector availableOptions={Jobs} selectedOptions={staticCheckParams} handleChange={handleChange}
                                 label={"Job"}/>
        </OptionsDropdown>
    )
}

export {StaticCheckOptions}
