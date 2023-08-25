import {styled, TextField} from "@mui/material";

const CustomTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        alignItems: "start",
        '& input': {
            // padding: '4px 8px',
        },
    },
    '& .MuiInputBase-root': {
        height: "100%",
    },
}))

const FormContainer = styled("form")(() => ({
    height: "100%",
}))

export { CustomTextField, FormContainer}
