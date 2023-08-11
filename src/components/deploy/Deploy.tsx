import React, {useEffect} from "react";
import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    styled,
    Theme,
    Typography,
    useTheme
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const envs = [
    'DEV',
    'QA',
    'NFT',
    'PRE-PROD',
    'PROD'
];


function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const DeployOptionContainer = styled(Box)(({theme}) => ({
    width: "90%",
    border: "1px solid black",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1)
}))

const DeployFormContainer = styled(Box)(({theme}) => ({
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
}))

const DeployOptions = ({setDeployParams}: any) => {
    const theme = useTheme();
    const [env, setEnv] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof env>) => {
        const {target: {value}} = event;
        setEnv(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setDeployParams([...env])
    }, [env, setDeployParams])

    return <DeployOptionContainer>
        <Box width="20%" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5">Deploy</Typography>
        </Box>
        <DeployFormContainer>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel>Env</InputLabel>
                <Select
                    multiple
                    value={env}
                    onChange={handleChange}
                    input={<OutlinedInput label="Env"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {envs.map((e) => (
                        <MenuItem
                            key={e}
                            value={e}
                            style={getStyles(e, env, theme)}
                        >
                            {e}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </DeployFormContainer>
    </DeployOptionContainer>
}

export {DeployOptions}
