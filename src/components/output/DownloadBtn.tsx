import React from "react";
import {PrimaryBtn} from "../shared/button";

const DownloadButton = ({yamlOutput}: { yamlOutput: string }) => {
    const file = new Blob([yamlOutput], {type: 'text/plain'});
    const isDisabled = yamlOutput === ""

    return (
        <PrimaryBtn variant='contained' disabled={isDisabled}>
            <a download="sample.yaml" target="_blank" rel="noreferrer" href={URL.createObjectURL(file)} style={{
                textDecoration: "inherit",
                color: "inherit",
            }}>Download</a>
        </PrimaryBtn>
    )
}

export {DownloadButton}
