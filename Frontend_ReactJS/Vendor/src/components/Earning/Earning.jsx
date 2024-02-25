import React from 'react'

export const Earning = (props) => {
    return (
        <tr>
            <td>{props.date}</td>
            <td>{props.amount}</td>
        </tr>
    )
}
