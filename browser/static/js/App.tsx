import * as React from 'react';
import {hot} from 'react-hot-loader';
import Minion from './Minion';
import styled from 'styled-components'


const ContentContainer = styled.div`
  margin: 20px;
`

const App = () => (
    <ContentContainer>
        <h1>Great React works.</h1>
        <Minion/>
        <Minion speed={2500}/>
    </ContentContainer>
)

export default hot(module)(App)