import React, {Dispatch, SetStateAction, useState} from "react";
import {TechStackType} from "../data/data";

interface AppDataType {
    selectedTs: TechStackType,
    setSelectedTs: Dispatch<SetStateAction<TechStackType>>,
    isGptResponseLoading: boolean,
    setIsGptResponseLoading: Dispatch<SetStateAction<boolean>>,
    output: string,
    setOutput: Dispatch<SetStateAction<string>>
}

const AppContext = React.createContext({} as AppDataType)

const AppProvider = ({children}: { children: any }) => {
    const [selectedTs, setSelectedTs] = useState<TechStackType>("none");
    const [isGptResponseLoading, setIsGptResponseLoading] = useState(false);
    const [output, setOutput] = useState("")

    const defaultValue = {
        selectedTs: selectedTs,
        setSelectedTs: setSelectedTs,
        isGptResponseLoading: isGptResponseLoading,
        setIsGptResponseLoading: setIsGptResponseLoading,
        output: output,
        setOutput: setOutput
    }

    return (
        <AppContext.Provider value={defaultValue}>
            {children}
        </AppContext.Provider>

    )
}

export {AppProvider, AppContext}
