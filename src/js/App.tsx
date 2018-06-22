import * as React from 'react';
import {hot} from 'react-hot-loader';
import {MyReactComponent} from './StatefullComponent';


const App = () => <div><MyReactComponent speed={1000}/></div>;

export default hot(module)(App)