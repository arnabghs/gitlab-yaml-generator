import React, {useState} from 'react';
import {Box, styled} from "@mui/material";
import {SpecificationSection} from "./components/Specifications";
import {OutputSection} from "./components/Output";

const AppContainer = styled(Box)(({theme}) => ({
    height: "100vh",
    width: "100vw",
    display: "flex"
}))


function App() {
    const [output, setOutput] = useState("")

    return (
        <AppContainer>
            <SpecificationSection setOutput={setOutput}/>
            <OutputSection output={output}/>
        </AppContainer>
    );
}

export default App;
