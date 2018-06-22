import * as React from 'react'
import {SFC, MouseEvent} from "react"

type Props = {
    onClick(e: MouseEvent<HTMLElement>): void
}

export const Button: SFC<Props> = ({onClick: handleClick, children}) => (
    <button onClick={handleClick}>{children}</button>
)