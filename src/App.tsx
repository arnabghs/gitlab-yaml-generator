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

const Header = styled(Box)(() => ({
    height: "10%",
    display: "flex",
    justifyContent: "center",
    caretColor: "transparent"
}))

function App() {
    return (
        <AppContainer>
            <AppProvider>
                <Header>
                    <Typography variant={"h2"}>YAML Generator</Typography>
                </Header>
                <Box height="90%" display={"flex"}>
                    <SpecificationSection/>
                    <OutputSection/>
                </Box>
            </AppProvider>
        </AppContainer>
    );
}

export default App;
