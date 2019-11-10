import * as React from 'react';
import Button from "./Button"
import styled from 'styled-components'

const MinionImg = styled.div`
    width: 128px;
    height: 128px;
    background-image: url('/static/img/ico.png');
    margin: 10px;
`

const MinionFlippedImg = styled(MinionImg)`
    background-image: url('/static/img/ico-flipped.png');
`

type State = Readonly<typeof initialState>

type Props = {
    speed?: number,
} & Readonly<typeof defaultProps>

const initialState = {
    flipped: false,
    isActive: true,
}

const defaultProps = {
    speed: 1000
}

class Minion extends React.Component<Props, State> {
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
        this.setState({
            isActive: true,
        })

        this.intervalId = window.setInterval(() => {
            this.setState(reverseIco)
        }, this.props.speed)
    }

    stopTimer = () => {
        this.setState({
            isActive: false,
        })

        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                {this.state.flipped ?
                    <MinionImg /> :
                    <MinionFlippedImg />
                }
                {this.state.isActive ?
                    <Button onClick={this.stopTimer}>Stop</Button> :
                    <>
                        <Button onClick={this.startTimer}>Start</Button>
                        <Button onClick={this.onButtonClick}>Reverse</Button>
                    </>
                }
            </div>
        )
    }
}

const reverseIco = (prevState: State) => ({
    flipped: !prevState.flipped,
})

export default Minion