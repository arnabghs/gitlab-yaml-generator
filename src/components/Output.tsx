import {Box, styled, Typography} from "@mui/material";
import React, {useContext} from "react";
import {CopyToClipboardButton} from "./output/CopyBtn";
import {DownloadButton} from "./output/DownloadBtn";
import {UploadToGitlabBtn} from "./output/UploadToGitlab";
import CatGif from "../images/loading-fast.gif";
import {AppContext} from "../store/AppProvider";

const Layout = styled(Box)(() => ({
    height: "100%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
}))

interface RootProps {
    isLoading?: boolean
}

const CodeContainer = styled(Box, {
        shouldForwardProp: (prop) => prop !== 'isLoading',
        name: 'MyThemeComponent',
        slot: 'Root'
    }) <RootProps> (({isLoading, theme}) => ({
        height: "86%",
        width: "95%",
        borderRadius: theme.spacing(8),
        background: "-webkit-linear-gradient(left, rgba(251,248,208,1) 0%, rgba(255,226,179,1) 100%)",
        overflow: "scroll",
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        padding: theme.spacing(4),
        boxShadow: "0px 0px 20px 5px rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: isLoading ? "center" : "start",
        alignItems: isLoading ? "center" : "start"
    }))

const ButtonBar = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(4),
    height: "8%"
}))

const HeaderTextContainer = styled(Box)(({theme}) => ({
    height: "6%",
    textAlign: "center",
    caretColor: "transparent",
    color: theme.palette.text.primary
}))

const formatOutput = (output: string): string => {
    let outputArr = output.split("\n")
    outputArr.pop()
    outputArr.shift()

    return outputArr.join("\n")
}

const OutputSection = () => {
    const ctx = useContext(AppContext)
    const output = ctx.output.includes("```yaml") ? formatOutput(ctx.output) : ctx.output

    return (
        <Layout>
            <HeaderTextContainer><Typography variant="h4">Generated YAML</Typography></HeaderTextContainer>
            <CodeContainer isLoading={ctx.isGptResponseLoading}>
                {ctx.isGptResponseLoading ?
                    <Box>
                        <Box
                            component="img"
                            sx={{
                                height: "40%",
                                objectFit: "contain",
                            }}
                            alt="spinner GIF"
                            src={CatGif}
                        />
                    </Box> :
                    <pre>{output}</pre>}
            </CodeContainer>
            <ButtonBar>
                <CopyToClipboardButton yamlOutput={output}/>
                <DownloadButton yamlOutput={output}/>
                <UploadToGitlabBtn yamlOutput={output}/>
            </ButtonBar>
        </Layout>
    )
}

export {OutputSection}
