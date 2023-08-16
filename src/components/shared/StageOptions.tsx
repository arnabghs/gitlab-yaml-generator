import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
    Theme,
    Typography,
    useTheme
} from "@mui/material";
import React from "react";

const StageOptionContainer = styled(Box)(({theme}) => ({
    width: "90%",
    border: "1px solid black",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1)
}))

const OptionsFormContainer = styled(Box)(({theme}) => ({
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
}))

const StageLabel = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%"
}))

function menuFontWeightStyles(option: string, selectedOptions: readonly string[], theme: Theme) {
    return {
        fontWeight:
            selectedOptions.indexOf(option) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultiOptionSelector = ({selectedOptions, availableOptions, handleChange, label}:
                                 {
                                     selectedOptions: string[],
                                     availableOptions: string[],
                                     handleChange: (event: SelectChangeEvent<typeof selectedOptions>) => void,
                                     label: string
                                 }) => {
    const theme = useTheme()

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={selectedOptions}
                onChange={handleChange}
                label={label}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
            >
                {availableOptions.map((opt, index) => (
                    <MenuItem
                        key={index}
                        value={opt}
                        style={menuFontWeightStyles(opt, selectedOptions, theme)}
                    >
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

const SingleOptionSelector = ({selectedItem, items, onChange, label}:
                                  {
                                      selectedItem: string,
                                      items: string[],
                                      onChange: (event: SelectChangeEvent) => void,
                                      label: string
                                  }) => {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedItem}
                label={label}
                onChange={onChange}
            >
                {items.map((item, index) => <MenuItem value={item} key={index}>{item.toUpperCase()}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

const StageOptions = ({stageName, children}: { stageName: string, children: React.ReactNode }) => {
    return <StageOptionContainer>
        <StageLabel><Typography variant="h5">{stageName}</Typography></StageLabel>
        <OptionsFormContainer>
            {children}
        </OptionsFormContainer>
    </StageOptionContainer>
}

export {StageOptionContainer, OptionsFormContainer, StageOptions, StageLabel, SingleOptionSelector, MultiOptionSelector}
