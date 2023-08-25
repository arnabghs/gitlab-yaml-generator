import React from 'react';
import {Box, styled} from "@mui/material";
import {SpecificationSection} from "./components/Specifications";
import {OutputSection} from "./components/Output";
import {AppProvider} from "./store/AppProvider";

const AppContainer = styled(Box)(() => ({
    height: "100vh",
    width: "100vw",
    display: "flex"
}))


function App() {
    return (
        <AppContainer>
            <AppProvider>
                <SpecificationSection/>
                <OutputSection/>
            </AppProvider>
        </AppContainer>
    );
}

export default App;
