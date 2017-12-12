// @flow

import React from 'react';

type State = {
    message: string
}

type Props = {

}

class MyReactComponent extends React.Component<{}, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            message : 'Great. React works.'
        };
    }

    render() {
        return (
            <span className="react-test">{this.state.message}</span>
        );
    }
}

export default MyReactComponent;