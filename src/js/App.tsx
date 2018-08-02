import * as React from 'react';
import {hot} from 'react-hot-loader';
import {MyReactComponent} from './StatefullComponent';


const App = () => <div className="content">
        <h1>Great React works.</h1>
        <MyReactComponent/>
        <MyReactComponent speed={2500}/>
    </div>

export default hot(module)(App)