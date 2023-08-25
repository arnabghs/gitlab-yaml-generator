import {Box, Button, styled, useTheme} from "@mui/material";
import React, {useState} from "react";
import {generateCompleteResponse, generateTemplateResponse, getStageByName} from "../helpers/util";
import {BuildOptions} from "./build/Build";
import {DeployOptions} from "./deploy/Deploy";
import {StaticCheckOptions} from "./staticChecks/StaticCheck";
import {BuildParam, StageProps, Stages, TechStackButtons, TechStackType} from "../data/data";
import {CustomTextField, FormContainer} from "./shared/InputForm";

const Layout = styled(Box)(() => ({
    height: "100%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
}))

const TechStack = styled(Box)(() => ({
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
}))

const GenerationLayout = styled(Box)(() => ({
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"

}))

const TypeOfGeneration = ({generateCompleteYAML, generateYAMLFromTemplate}:
                              { generateCompleteYAML: () => void, generateYAMLFromTemplate: () => void }) => {
    return (
        <GenerationLayout>
            <Button variant="outlined" onClick={generateCompleteYAML}> Generate from Scratch</Button>
            <Button variant="outlined" onClick={generateYAMLFromTemplate}> Generate from template</Button>
        </GenerationLayout>
    )
}

const TemplateInputLayout = styled(Box)(() => ({
    width: "100%",
    height: "60%",
    textAlign: "center"
}))

const TemplateInputSection = ({
                                  selectedTs,
                                  setOutput,
                                  setIsGptResponseLoading
                              }: { selectedTs: TechStackType, setOutput: any, setIsGptResponseLoading: any }) => {
    const theme = useTheme()
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // setUserInput({templateYAML: inputValue})

        setIsGptResponseLoading(true)
        generateTemplateResponse(selectedTs, inputValue, setOutput, setIsGptResponseLoading)
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
                <Button type="submit" variant="contained" sx={{marginTop: theme.spacing(2), backgroundColor: "green"}}>
                    Submit YAML
                </Button>
            </FormContainer>
        </TemplateInputLayout>
    )
}

const StageOptionsLayout = styled(Box)(() => ({
    width: "100%",
    height: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}))

const SubmitBtnContainer = styled(Box)(() => ({
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


const StageOptions = ({
                          selectedTs,
                          setOutput,
                          setIsGptResponseLoading,
                      }: { selectedTs: TechStackType, setOutput: any, setIsGptResponseLoading: any }) => {
    const [stageState, setStageState] = useState(Stages)
    const [buildParams, setBuildParams] = useState<BuildParam>()
    const [deployParams, setDeployParams] = useState([])
    const [staticCheckParams, setStaticCheckParams] = useState([])

    const setEnabledStages = () => {
        setIsGptResponseLoading(true)

        const enabledStages = stageState.filter(st => st.selected).map(st => st.name)
        generateCompleteResponse(selectedTs, enabledStages, setOutput, setIsGptResponseLoading, buildParams, deployParams, staticCheckParams)
    }

    const updateStageState = (stage: StageProps) => {
        let updatedStageState = stageState.map(st => {
            if (st.name === stage.name) return {...stage, selected: !stage.selected}
            return st
        })
        setStageState(updatedStageState)
    }

    return (
        <StageOptionsLayout>
            <StageContainer>
                {stageState.map((stage, index) => {
                    return <Button variant={stage.selected ? "contained" : "outlined"} onClick={() => {
                        updateStageState(stage)
                    }} key={index}>{stage.name}</Button>
                })}
            </StageContainer>
            {(getStageByName(stageState, "build").selected) &&
                <BuildOptions selectedTs={selectedTs} setBuildParams={setBuildParams}/>}
            {getStageByName(stageState, "deploy").selected && <DeployOptions setDeployParams={setDeployParams}/>}
            {getStageByName(stageState, "static-checks").selected &&
                <StaticCheckOptions setStaticCheckParams={setStaticCheckParams}/>}
            <SubmitBtnContainer>
                <Button variant="contained" onClick={setEnabledStages}
                        sx={{backgroundColor: "green"}}> Submit</Button>
            </SubmitBtnContainer>
        </StageOptionsLayout>
    )
}


const SpecificationSection = ({setOutput, setIsGptResponseLoading}:
                                  {
                                      setOutput: (result: string) => void,
                                      setIsGptResponseLoading: (b: boolean) => void
                                  }) => {
    const [fromScratch, setFromScratch] = useState(false)
    const [fromTemplate, setFromTemplate] = useState(false)
    const [selectedTs, setSelectedTs] = useState<TechStackType>("none");

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
                    return <Button variant={(selectedTs === tsBtn.label) ? "contained" : "outlined"} key={index}
                                   onClick={() => setSelectedTs(tsBtn.label)}>{tsBtn.label}</Button>
                })}
            </TechStack>
            <TypeOfGeneration generateCompleteYAML={generateCompleteYAML}
                              generateYAMLFromTemplate={generateYAMLFromTemplate}/>
            {fromScratch && <StageOptions selectedTs={selectedTs} setOutput={setOutput}
                                          setIsGptResponseLoading={setIsGptResponseLoading}/>}
            {fromTemplate && <TemplateInputSection selectedTs={selectedTs} setOutput={setOutput}
                                                   setIsGptResponseLoading={setIsGptResponseLoading}/>}
        </Layout>
    )
}

export {SpecificationSection}
