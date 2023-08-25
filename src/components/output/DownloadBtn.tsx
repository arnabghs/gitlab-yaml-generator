import {Button} from "@mui/material";
import React from "react";

const DownloadButton = ({yamlOutput}: { yamlOutput: string }) => {
    const file = new Blob([yamlOutput], {type: 'text/plain'});

    return (
        <Button variant="outlined">
            <a download="sample.yaml" target="_blank" rel="noreferrer" href={URL.createObjectURL(file)} style={{
                textDecoration: "inherit",
                color: "inherit",
            }}>Download</a>
        </Button>
    )
}

export {DownloadButton}
