import React, {useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled, Typography} from "@mui/material";

const BuildOptionContainer = styled(Box)(({theme}) => ({
    width: "90%",
    border: "1px solid black",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1)
}))

const BuildFormContainer = styled(Box)(({theme}) => ({
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
}))

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

    return <BuildOptionContainer>
        <Box width="20%" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">Build</Typography>
        </Box>
        <BuildFormContainer>
            <FormControl fullWidth>
                <InputLabel>GOOS</InputLabel>
                <Select
                    value={GOOS}
                    label="GOOS"
                    onChange={updateGOOS}
                >
                    <MenuItem value={"darwin"}>Darwin</MenuItem>
                    <MenuItem value={"linux"}>Linux</MenuItem>
                    <MenuItem value={"windows"}>Windows</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>GOARCH</InputLabel>
                <Select
                    value={GOARCH}
                    label="GOARCH"
                    onChange={updateGOARCH}
                >
                    <MenuItem value={"amd64"}>amd64</MenuItem>
                    <MenuItem value={"arm64"}>arm64</MenuItem>
                </Select>
            </FormControl>
        </BuildFormContainer>
    </BuildOptionContainer>
}

export {BuildOptions}
