import React, {useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import {OptionsDropdown, SingleOptionSelector} from "../shared/OptionsDropdown";
import {TechStackType} from "../../data/data";

const GoBuildOptions = ({setBuildParams}: any) => {
    const GOOSOptions = ["darwin", "linux", "windows"]
    const GOARCHOptions = ["amd64", "arm64"]

    const [GOOS, setGOOS] = useState("")
    const [GOARCH, setGOARCH] = useState("")

    const updateGOOS = (event: SelectChangeEvent) => {
        setGOOS(event.target.value);
    };

    const updateGOARCH = (event: SelectChangeEvent) => {
        setGOARCH(event.target.value);
    };

    useEffect(() => {
        setBuildParams({"GOOS": GOOS, "GOARCH": GOARCH})
    }, [GOOS, GOARCH, setBuildParams])

    return (
        <OptionsDropdown stageName={"Build"}>
            <SingleOptionSelector selectedItem={GOOS} onChange={updateGOOS} items={GOOSOptions} label={"GOOS"}/>
            <SingleOptionSelector selectedItem={GOARCH} onChange={updateGOARCH} items={GOARCHOptions} label={"GOARCH"}/>
        </OptionsDropdown>
    )
}

const BuildOptions = ({selectedTs, setBuildParams}: { selectedTs: TechStackType | undefined, setBuildParams: any}) => {

    return (
        <>
            {(selectedTs && selectedTs === "GO") ? <GoBuildOptions setBuildParams={setBuildParams}/> : <></>}
        </>
    )
}

export { BuildOptions}
