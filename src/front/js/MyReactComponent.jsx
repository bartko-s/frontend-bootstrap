import React from 'react';

class MyReactComponent extends React.Component {

    constructor(props) {
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