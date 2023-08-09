import {Box, Button, styled, TextField, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import {COMPLETE_YAML_PROMPT} from "../prompt_templates/go/generateFullYaml";
import {YAML_FROM_TEMPLATE_PROMPT} from "../prompt_templates/go/generateYamlFromTemplate";

const Layout = styled(Box)(({theme}) => ({
    height: "100%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
}))

const TechStack = styled(Box)(({theme}) => ({
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
}))

type TechBtnProps = {
    label: string
    disabled: boolean
}

const TechStackButtons: TechBtnProps[] = [
    {label: "GO", disabled: false},
    {label: "node", disabled: true},
    {label: "php", disabled: true},
    {label: "kotlin", disabled: true}
]

const GenerationLayout = styled(Box)(({theme}) => ({
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"

}))

const TypeOfGeneration = ({
                              generateCompleteYAML,
                              generateYAMLFromTemplate
                          }: { generateCompleteYAML: () => void, generateYAMLFromTemplate: () => void }) => {
    return (
        <GenerationLayout>
            <Button variant="outlined" onClick={generateCompleteYAML}> Generate from Scratch</Button>
            <Button variant="outlined" onClick={generateYAMLFromTemplate}> Generate from template</Button>
        </GenerationLayout>
    )
}

const TemplateInputLayout = styled(Box)(({theme}) => ({
    width: "100%",
    height: "60%",
    textAlign: "center"
}))

const FormContainer = styled("form")(() => ({
    height: "100%"
}))

const CustomTextField = styled(TextField)(({theme}) => ({
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

const TemplateInputSection = ({setUserInput}: any) => {
    const theme = useTheme()
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setUserInput({templateYAML: inputValue})
    };
    return (
        <TemplateInputLayout>
            <FormContainer onSubmit={handleSubmit}>
                <CustomTextField
                    placeholder="Enter gitlab template here"
                    multiline
                    rows={24}
                    sx={{
                        height: "100%",
                        width: "90%",
                    }}
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button type="submit" variant="contained" sx={{marginTop: theme.spacing(2)}}>
                    Submit YAML
                </Button>
            </FormContainer>
        </TemplateInputLayout>
    )
}

const StageOptionsLayout = styled(Box)(({theme}) => ({
    width: "100%",
    height: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}))

const SubmitBtnContainer = styled(Box)(({theme}) => ({
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

const StageContainer = styled(Box)(({theme}) => ({
    height: "20%",
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: 'wrap',
    gap: theme.spacing(2)
}))

type StageProps = {
    name: string
    selected: boolean
}

const StageOptions = ({setUserInput}: any) => {
    let Stages: StageProps[] = [
        {name: "static-checks", selected: false},
        {name: "build", selected: false},
        {name: "test", selected: false},
        {name: "package", selected: false},
        {name: "publish", selected: false},
        {name: "deploy", selected: false},
        {name: "DAST-scan", selected: false}
    ]

    const [stageState, setStageState] = useState(Stages)

    const setEnabledStages = () => {
        const enabledStages = stageState.filter(st => st.selected).map(st => st.name)
        setUserInput({stages: enabledStages})
    }

    return (
        <StageOptionsLayout>
            <StageContainer>
                {stageState.map((stage, index) => {
                    return <Button variant={stage.selected ? "contained" : "outlined"} onClick={() => {
                        let updatedStageState = stageState.map(st => {
                            if (st.name === stage.name) return {...stage, selected: !stage.selected}
                            return st
                        })
                        setStageState(updatedStageState)
                    }} key={index}>{stage.name}</Button>
                })}
            </StageContainer>
            <SubmitBtnContainer>
                <Button variant="contained" onClick={setEnabledStages}> Submit</Button>
            </SubmitBtnContainer>
        </StageOptionsLayout>
    )
}

type UserInput = {
    stages?: string[]
    templateYAML?: string
}

const SpecificationSection = ({setOutput}: { setOutput: (result: any) => void }) => {
    const [fromScratch, setFromScratch] = useState(false)
    const [fromTemplate, setFromTemplate] = useState(false)
    const [userInput, setUserInput] = useState<UserInput>()

    useEffect(() => {
        let templateYAML = userInput?.templateYAML
        let stages = userInput?.stages

        if (templateYAML && stages) {
            console.error("Both values cant be given simultaneously")
        }

        if (!templateYAML && stages?.length === 0) {
            console.error("No input is given")
        }

        if (templateYAML && !stages) {
            setOutput(YAML_FROM_TEMPLATE_PROMPT(templateYAML))
        }

        if (!templateYAML && stages) {
            setOutput(COMPLETE_YAML_PROMPT(stages))
        }

    }, [userInput, setOutput])

    const generateCompleteYAML = () => {
        setFromScratch(true)
        setFromTemplate(false)
    }

    const generateYAMLFromTemplate = () => {
        setFromScratch(false)
        setFromTemplate(true)
    }

    return (
        <Layout>
            <TechStack>
                {TechStackButtons.map((tsBtn, index) => {
                    return <Button variant="contained" disabled={tsBtn.disabled} key={index}>{tsBtn.label}</Button>
                })}
            </TechStack>
            <TypeOfGeneration generateCompleteYAML={generateCompleteYAML}
                              generateYAMLFromTemplate={generateYAMLFromTemplate}/>
            {fromScratch && <StageOptions setUserInput={setUserInput}/>}
            {fromTemplate && <TemplateInputSection setUserInput={setUserInput}/>}
        </Layout>
    )
}

export {SpecificationSection}
