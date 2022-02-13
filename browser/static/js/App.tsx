import * as React from 'react';
import {hot} from 'react-hot-loader/root';
import Minion from './containers/Minion';
import styled from 'styled-components'
import Menu from "./components/Menu"
import Homepage from "./containers/Homepage"
import {
    BrowserRouter as Router,
    Route, Routes
} from 'react-router-dom'
import PageNotFound from "./containers/PageNotFound"


const ContentContainer = styled.div`
  margin: 20px;
`

const App = () => (
    <Router>
        <ContentContainer>
            <Menu/>
            <Routes>
                <Route path="/minions" element={<Minion/>} />
                <Route path="/" element={<Homepage/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </ContentContainer>
    </Router>
)

export default hot(App)
