import React from 'react'

export default function Dice(props) {
    const styles = {backgroundColor : (props.isHeld && "green")}

    return (
        <div className='die-box' style = {styles} onClick = {props.holdDice}>
            <h2>{props.value}</h2>
        </div>
    )
}
