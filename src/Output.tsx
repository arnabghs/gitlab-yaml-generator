import {Box, Button, Snackbar, styled, Typography} from "@mui/material";
import React, {useState} from "react";

const Layout = styled(Box)(({theme}) => ({
    height: "auto",
    width: "50%",
    display: "flex",
    flexDirection: "column",
}))

const CodeContainer = styled(Box)(({theme}) => ({
    height: "90%",
    width: "99%",
    border: "1px solid black",
    backgroundColor: "#f1f7d5",
    overflow: "auto",
    padding: theme.spacing(4)
}))

const CopyToClipboardButton = ({yamlOutput}: any) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(yamlOutput)
    }

    return (
        <>
            <Button onClick={handleClick}>COPY</Button>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    )
}

const OutputSection = ({output}: { output: any }) => {
    return (
        <Layout>
            <Box height="5%" textAlign="center"><Typography variant="h4">Generated YAML:</Typography></Box>
            <CopyToClipboardButton yamlOutput={output}/>
            <CodeContainer> {output}</CodeContainer>
        </Layout>
    )
}

export {OutputSection}
