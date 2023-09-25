import {Button, styled} from "@mui/material";

const PrimaryBtn = styled(Button)(({theme}) => ({
    background: theme.palette.secondary.main,
    color : theme.palette.secondary.light,
    marginTop: theme.spacing(2)
}))

export {PrimaryBtn}
