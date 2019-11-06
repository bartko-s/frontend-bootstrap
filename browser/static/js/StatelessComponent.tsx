import * as React from 'react'
import {FunctionComponent, MouseEvent} from "react"

type Props = {
    onClick(e: MouseEvent<HTMLElement>): void
}

export const Button: FunctionComponent<Props> = ({onClick: handleClick, children}) => (
    <button onClick={handleClick}>{children}</button>
)