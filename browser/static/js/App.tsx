import * as React from 'react';
import {hot} from 'react-hot-loader/root';
import Minion from './containers/Minion';
import styled from 'styled-components'
import Menu from "./components/Menu"
import Homepage from "./containers/Homepage"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import PageNotFound from "./containers/PageNotFound"


const ContentContainer = styled.div`
  margin: 20px;
`

const App = () => (
    <Router>
        <ContentContainer>
            <Menu/>
            <Switch>
                <Route path="/minions">
                    <Minion/>
                </Route>
                <Route exact path="/">
                    <Homepage/>
                </Route>
                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
        </ContentContainer>
    </Router>
)

export default hot(App)
