import * as React from 'react'
import {FunctionComponent, MouseEvent} from "react"
import styled from 'styled-components'


type Props = {
    onClick(e: MouseEvent<HTMLElement>): void,
    className?: string,
}

const Button: FunctionComponent<Props> = (props) => (
    <button className={props.className} onClick={props.onClick}>{props.children}</button>
)

const StyledButton = styled(Button)`
  margin-right: 5px;
  border-radius: 3px;
  border: 1px solid black;
  outline: none;
  &:hover {
    background-color: white;
  }
  &:active {
    background-color: #eee;
  }
  &:focus {
    outline: none;
  }
`

export default StyledButton;