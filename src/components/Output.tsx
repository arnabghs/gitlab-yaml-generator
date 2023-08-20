import {Box, styled, Typography} from "@mui/material";
import React from "react";
import {CopyToClipboardButton} from "./output/CopyBtn";
import {DownloadButton} from "./output/DownloadBtn";
import {UploadToGitlabBtn} from "./output/UploadToGitlab";
import CatGif from "../images/loading-fast.gif";

const Layout = styled(Box)(() => ({
    height: "auto",
    width: "50%",
    display: "flex",
    flexDirection: "column",
}))

const CodeContainer = styled(Box)(({theme}) => ({
    height: "90%",
    width: "95%",
    border: "1px solid black",
    backgroundColor: "#f1f7d5",
    overflow: "auto",
    padding: theme.spacing(4)
}))

const LoaderContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}))

const ButtonBar = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(4),
    height: "5%"
}))

const formatOutput = (output: string): string => {
    let outputArr = output.split("\n")
    outputArr.pop()
    outputArr.shift()

    return outputArr.join("\n")
}

const OutputSection = ({outputStr, isGptResponseLoading}: { outputStr: string, isGptResponseLoading: boolean }) => {
    const output = formatOutput(outputStr)

    return (
        <Layout>
            <Box height="5%" textAlign="center"><Typography variant="h4">Generated YAML:</Typography></Box>
            <ButtonBar>
                <CopyToClipboardButton yamlOutput={output}/>
                <DownloadButton yamlOutput={output}/>
                <UploadToGitlabBtn yamlOutput={output}/>
            </ButtonBar>
            <CodeContainer>
                {isGptResponseLoading ?
                    <LoaderContainer>
                        <Box
                            component="img"
                            sx={{
                                height: "40%",
                                objectFit: "contain",
                            }}
                            alt="spinner GIF"
                            src={CatGif}
                        />
                    </LoaderContainer> :
                    <pre>{output}</pre>}
            </CodeContainer>
        </Layout>
    )
}

export {OutputSection}
