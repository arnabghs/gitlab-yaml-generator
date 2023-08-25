import {BuildParam, Stage, StageProps, StaticCheckJobName, TechStackType} from "../data/data";
import {generateResponseWithInContextLearn} from "../api/openaiInContextLearn";
import {YAML_FROM_TEMPLATE_PROMPT_NODE} from "../prompt_templates/node/generateYamlFromTemplateNode";
import {YAML_FROM_TEMPLATE_PROMPT} from "../prompt_templates/go/generateYamlFromTemplate";
import {generateResponse} from "../api/openai";
import {COMPLETE_YAML_PROMPT} from "../prompt_templates/go/generateFullYaml";
import {COMPLETE_YAML_PROMPT_NODE} from "../prompt_templates/node/generateFullYamlNode";
import {Dispatch, SetStateAction} from "react";

const getStageByName = (stages: StageProps[], name: Stage): StageProps => {
    return stages.filter(st => st.name === name)[0]
}

const generateTemplateResponse = (selectedTs: TechStackType,
                                  templateYAML: string,
                                  setOutput: Dispatch<SetStateAction<string>>,
                                  setIsGptResponseLoading: Dispatch<SetStateAction<boolean>>) => {
    if (selectedTs === "node") {
        generateResponseWithInContextLearn(YAML_FROM_TEMPLATE_PROMPT_NODE(templateYAML))
            .then(response => {
                const responseText = response?.choices?.shift()?.message?.content;
                setOutput(responseText as string)
                setIsGptResponseLoading(false)
            })
    } else if (selectedTs === "GO") {
        let promptInput = YAML_FROM_TEMPLATE_PROMPT(templateYAML)
        generateResponse(promptInput)
            .then(response => {
                const responseText = response?.choices?.shift()?.message?.content;
                setOutput(responseText as string)
                setIsGptResponseLoading(false)
            })
    } else {
        console.log("selectedTs is neither node nor GO");
    }
}

const generateCompleteResponse = (selectedTs: TechStackType,
                                  stages: Stage[],
                                  setOutput: Dispatch<SetStateAction<string>>,
                                  setIsGptResponseLoading: Dispatch<SetStateAction<boolean>>,
                                  buildParams?: BuildParam,
                                  deployParams?: string[],
                                  staticCheckParams?: StaticCheckJobName[]) => {
    if (selectedTs === "GO") {
        let promptInput = COMPLETE_YAML_PROMPT(stages, buildParams, deployParams, staticCheckParams)
        generateResponse(promptInput)
            .then(response => {
                const responseText = response?.choices?.shift()?.message?.content;
                setOutput(responseText as string)
                setIsGptResponseLoading(false)
            })
    } else if (selectedTs === "node") {
        let promptInput = COMPLETE_YAML_PROMPT_NODE(stages, deployParams, staticCheckParams)
        generateResponse(promptInput)
            .then(response => {
                const responseText = response?.choices?.shift()?.message?.content;
                setOutput(responseText as string)
                setIsGptResponseLoading(false)
            })
    } else {
        console.log("selectedTs is neither node nor GO")
    }
}

export {getStageByName, generateTemplateResponse, generateCompleteResponse}
