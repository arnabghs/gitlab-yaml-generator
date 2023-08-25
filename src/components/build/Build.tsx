import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import {OptionsDropdown, SingleOptionSelector} from "../shared/OptionsDropdown";
import {AppContext} from "../../store/AppProvider";
import {BuildParam} from "../../data/data";

const GoBuildOptions = ({setBuildParams}: { setBuildParams: Dispatch<SetStateAction<BuildParam | undefined>> }) => {
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

const BuildOptions = ({setBuildParams}: { setBuildParams: Dispatch<SetStateAction<BuildParam | undefined>> }) => {
    const ctx = useContext(AppContext)

    return (
        <>
            {(ctx.selectedTs === "GO") && <GoBuildOptions setBuildParams={setBuildParams}/>}
        </>
    )
}

export {BuildOptions}
