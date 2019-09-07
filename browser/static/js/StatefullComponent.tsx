import * as React from 'react';
import {ReactNode} from 'react';
import {Button} from "./StatelessComponent"

type State = Readonly<typeof initialState>

type Props = {
    speed?: number,
} & Readonly<typeof defaultProps>

const initialState = {
    icoClass: "ico",
}

const defaultProps = {
    speed: 1000
}

export class MyReactComponent extends React.Component<Props, State> {
    readonly state: State = initialState;

    static defaultProps = defaultProps;

    private intervalId?: number;

    onButtonClick = () => {
        this.setState(reverseIco)
    };

    componentDidMount(): void {
        this.startTimer()
    }

    componentWillUnmount(): void {
        this.stopTimer()
    }

    startTimer = () => {
        this.intervalId = window.setInterval(() => {
            this.setState(reverseIco)
        }, this.props.speed)
    }

    stopTimer = () => {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
        }
    }

    render(): ReactNode {
        return (
            <div>
                <div className={this.state.icoClass}/>
                <Button onClick={this.onButtonClick}>Reverse</Button>
                <Button onClick={this.stopTimer}>Stop</Button>
                <Button onClick={this.startTimer}>Start</Button>
            </div>
        )
    }
}

const reverseIco = (prevState: State) => ({
    icoClass: prevState.icoClass === "ico" ? "ico ico__reverse" : "ico",
})
