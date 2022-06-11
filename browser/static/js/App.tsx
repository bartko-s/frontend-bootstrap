import * as React from 'react';
import Minion from './containers/Minion';
import styled from 'styled-components'
import Menu from "./components/Menu"
import Homepage from "./containers/Homepage"
import {
    BrowserRouter,
    Route, Routes
} from 'react-router-dom'
import PageNotFound from "./containers/PageNotFound"


const ContentContainer = styled.div`
  margin: 20px;
`

const App = () => (
    <BrowserRouter>
         <ContentContainer>
             <Menu/>
             <Routes>
                 <Route path="/minions" element={<Minion/>} />
                 <Route path="/" element={<Homepage/>} />
                 <Route path="*" element={<PageNotFound/>} />
             </Routes>
         </ContentContainer>
    </BrowserRouter>
)

export default App
