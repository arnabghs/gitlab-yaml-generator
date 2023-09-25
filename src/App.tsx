import React from 'react';
import {Box, styled, Typography} from "@mui/material";
import {SpecificationSection} from "./components/Specifications";
import {OutputSection} from "./components/Output";
import {AppProvider} from "./store/AppProvider";

const AppContainer = styled(Box)(() => ({
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column"
}))

const Header = styled(Box)(({theme}) => ({
    height: "8%",
    display: "flex",
    justifyContent: "center",
    caretColor: "transparent",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.primary
}))

const AppBody = styled(Box)(({theme}) => ({
    height: "92%",
    display: "flex",
    backgroundColor: theme.palette.primary.light
}))

function App() {
    return (
        <AppContainer>
            <AppProvider>
                <Header>
                    <Typography variant={"h2"}>YAML Generator</Typography>
                </Header>
                <AppBody>
                    <SpecificationSection/>
                    <OutputSection/>
                </AppBody>
            </AppProvider>
        </AppContainer>
    );
}

export default App;
