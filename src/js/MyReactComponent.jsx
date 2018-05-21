// @flow

import * as React from 'react';

type State = {
    message: string,
    smile: string
}

class MyReactComponent extends React.Component<{}, State> {
    state =  {
        message : 'Great. React works.',
        smile: ""
    };

    onHoverHandler = () => {
        this.setState({
            smile: ":)"
        })
    };

    render(): React.Node {
        return (
            <div>
                <span className="react-test">{this.state.message + ' ' + this.state.smile}</span>
                <span onMouseOver={this.onHoverHandler}>Hover this</span>
            </div>
        );
    }
}

export default MyReactComponent;