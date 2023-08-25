import React, {useState} from "react";
import {Button, Snackbar} from "@mui/material";

const CopyToClipboardButton = ({yamlOutput}: { yamlOutput: string }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(yamlOutput)
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClick}>COPY</Button>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    )
}

export { CopyToClipboardButton}
