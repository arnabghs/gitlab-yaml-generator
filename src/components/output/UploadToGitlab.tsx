import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {SingleOptionSelector} from "../shared/OptionsDropdown";
import {SelectChangeEvent, styled, Typography} from "@mui/material";
import {CustomTextField} from "../shared/InputForm";
import {uploadToGitlab} from "../../api/gitlab";

const StyledForm = styled(Box)(({theme}) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25%",
    height: "40%",
    backgroundColor: "white",
    border: '1px solid #000',

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: theme.spacing(4)

}))


const UploadOptions = ["create", "update"]

const UploadToGitlabBtn = ({yamlOutput}: { yamlOutput: string }) => {
    const [open, setOpen] = useState(false);
    const [uploadOption, setUploadOption] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [branch, setBranch] = useState("");
    const [repoID, setRepoID] = useState("");


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const selectUploadOption = (event: SelectChangeEvent) => {
        setUploadOption(event.target.value);
    }

    const pushToGitlab = () => {
        uploadToGitlab(uploadOption, repoID,accessToken, branch, yamlOutput)
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Upload to Gitlab</Button>
            <Modal open={open} onClose={handleClose}>
                <StyledForm>
                    <CustomTextField
                        placeholder="Repo ID"
                        value={repoID}
                        onChange={(event) => setRepoID(event.target.value)}
                    />
                    <CustomTextField
                        placeholder="Repo Access token"
                        value={accessToken}
                        onChange={(event) => setAccessToken(event.target.value)}
                    />
                    <CustomTextField
                        placeholder="Branch name"
                        value={branch}
                        onChange={(event) => setBranch(event.target.value)}
                    />
                    <Typography variant={"caption"}>Make sure the branch already exists</Typography>
                    <SingleOptionSelector selectedItem={uploadOption} onChange={selectUploadOption}
                                          items={UploadOptions} label={"action"}/>
                    <Button variant="contained" onClick={pushToGitlab}>Push</Button>
                </StyledForm>
            </Modal>
        </div>
    );
}

export {UploadToGitlabBtn}
