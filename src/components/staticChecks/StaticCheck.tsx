import React, {useEffect} from "react";
import {StaticCheckJobName} from "../../data/data";
import {MultiOptionSelector, OptionsDropdown} from "../shared/OptionsDropdown";
import {SelectChangeEvent} from "@mui/material";

const Jobs: StaticCheckJobName[] = [
    'lint',
    'gemnasium-dependency_scanning'
];

const StaticCheckOptions = ({setStaticCheckParams}: any) => {
    const [jobs, setJobs] = React.useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof jobs>,) => {
        const {target: {value}} = event;
        setJobs(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setStaticCheckParams([...jobs])
    }, [jobs, setStaticCheckParams])

    return (
        <OptionsDropdown stageName={"Static-Check"}>
            <MultiOptionSelector availableOptions={Jobs} selectedOptions={jobs} handleChange={handleChange} label={"Job"}/>
        </OptionsDropdown>
    )
}

export {StaticCheckOptions}
