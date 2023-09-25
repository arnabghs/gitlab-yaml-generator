import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {SingleOptionSelector} from "../shared/OptionsDropdown";
import {CircularProgress, SelectChangeEvent, styled, Typography} from "@mui/material";
import {CustomTextField} from "../shared/InputForm";
import {uploadToGitlab, validateGeneratedYAML} from "../../api/gitlab";
import CatGif from "../../images/loading-fast.gif";
import {PrimaryBtn} from "../shared/button";

const StyledForm = styled(Box)(({theme}) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25%",
    height: "50%",
    backgroundColor: theme.palette.secondary.light,
    border: '1px solid #000',

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4)
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

    const isDisabled = yamlOutput === ""

    return (
        <div>
            <PrimaryBtn variant='contained' disabled={isDisabled} onClick={handleOpen}>Upload to Gitlab</PrimaryBtn>
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
                            <PrimaryBtn variant="contained" onClick={validateYAML}>Validate YAML</PrimaryBtn>
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
                            <PrimaryBtn variant="contained" disabled={!isValidYaml} onClick={pushToGitlab}>Push</PrimaryBtn>
                        </>
                    }
                </StyledForm>
            </Modal>
        </div>
    );
}

export {UploadToGitlabBtn}
