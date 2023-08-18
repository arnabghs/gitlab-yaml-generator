import {Box, styled, Typography} from "@mui/material";
import React from "react";
import {CopyToClipboardButton} from "./output/CopyBtn";
import {DownloadButton} from "./output/DownloadBtn";
import {UploadToGitlabBtn} from "./output/UploadToGitlab";

const Layout = styled(Box)(({theme}) => ({
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

const ButtonBar = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(4),
    height: "5%"
}))

const OutputSection = ({output}: { output: string }) => {
    return (
        <Layout>
            <Box height="5%" textAlign="center"><Typography variant="h4">Generated YAML:</Typography></Box>
            <ButtonBar>
                <CopyToClipboardButton yamlOutput={output}/>
                <DownloadButton yamlOutput={output}/>
                <UploadToGitlabBtn yamlOutput={output}/>
            </ButtonBar>
            <CodeContainer>
                <pre>{output}</pre>
            </CodeContainer>
        </Layout>
    )
}

export {OutputSection}
