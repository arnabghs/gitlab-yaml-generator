import React, {useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import {SingleOptionSelector, StageOptions} from "../shared/StageOptions";


const GOOSOptions = ["darwin", "linux", "windows"]
const GOARCHOptions = ["amd64", "arm64"]

const BuildOptions = ({setBuildParams}: any) => {
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
        <StageOptions stageName={"Build"}>
            <SingleOptionSelector selectedItem={GOOS} onChange={updateGOOS} items={GOOSOptions} label={"GOOS"}/>
            <SingleOptionSelector selectedItem={GOARCH} onChange={updateGOARCH} items={GOARCHOptions} label={"GOARCH"}/>
        </StageOptions>
    )
}

export {BuildOptions}
