import React, {useState} from "react";
import { Snackbar} from "@mui/material";
import {PrimaryBtn} from "../shared/button";

const CopyToClipboardButton = ({yamlOutput}: { yamlOutput: string }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(yamlOutput)
    }

    const isDisabled = yamlOutput === ""

    return (
        <>
            <PrimaryBtn variant='contained' disabled={isDisabled} onClick={handleClick}>COPY</PrimaryBtn>
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
