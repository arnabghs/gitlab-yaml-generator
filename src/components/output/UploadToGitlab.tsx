import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {SingleOptionSelector} from "../shared/OptionsDropdown";
import {CircularProgress, SelectChangeEvent, styled, Typography} from "@mui/material";
import {CustomTextField} from "../shared/InputForm";
import {uploadToGitlab, validateGeneratedYAML} from "../../api/gitlab";
import CatGif from "../../images/loading-fast.gif";

const StyledForm = styled(Box)(({theme}) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25%",
    height: "50%",
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
    const [isPushingInProgress, setIsPushingInProgress] = useState(false);
    const [isValidationInProgress, setIsValidationInProgress] = useState(false);
    const [isValidYaml, setIsValidYaml] = useState(false);
    const [validationMsg, setValidationMsg] = useState("");


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const selectUploadOption = (event: SelectChangeEvent) => {
        setUploadOption(event.target.value);
    }

    const pushToGitlab = () => {
        setIsPushingInProgress(true)
        uploadToGitlab(uploadOption, repoID, accessToken, branch, yamlOutput, setIsPushingInProgress, handleClose)
    }

    const validateYAML = () => {
        setIsValidationInProgress(true)
        validateGeneratedYAML(yamlOutput, repoID, accessToken, setIsValidationInProgress, setIsValidYaml, setValidationMsg)
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Upload to Gitlab</Button>
            <Modal open={open} onClose={handleClose}>
                <StyledForm>
                    {isPushingInProgress ? <Box
                            component="img"
                            sx={{
                                height: "100%",
                                objectFit: "contain",
                            }}
                            alt="spinner GIF"
                            src={CatGif}
                        /> :
                        <>
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
                            <Button variant="contained" onClick={validateYAML} sx={{backgroundColor: "#0d9465"}}>
                                Validate YAML
                            </Button>
                            {isValidationInProgress && <Box textAlign={"center"}><CircularProgress/></Box>}
                            {validationMsg && <Typography>{validationMsg}</Typography>}
                            <CustomTextField
                                placeholder="Branch name"
                                value={branch}
                                onChange={(event) => setBranch(event.target.value)}
                            />
                            <Typography variant={"caption"}>Make sure the branch already exists</Typography>
                            <SingleOptionSelector selectedItem={uploadOption} onChange={selectUploadOption}
                                                  items={UploadOptions} label={"action"}/>
                            <Button variant="contained" disabled={!isValidYaml} onClick={pushToGitlab}>Push</Button>
                        </>
                    }
                </StyledForm>

            </Modal>
        </div>
    );
}

export {UploadToGitlabBtn}
