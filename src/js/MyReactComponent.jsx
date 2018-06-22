import * as React from 'react';

class MyReactComponent extends React.Component {
    state =  {
        message : 'Great. React works.',
        smile: ""
    };

    onHoverHandler = () => {
        this.setState({
            smile: ":)"
        })
    };

    render() {
        return (
            <div>
                <span className="react-test">{this.state.message + ' ' + this.state.smile}</span>
                <span onMouseOver={this.onHoverHandler}>Hover this</span>
            </div>
        );
    }
}

export default MyReactComponent;