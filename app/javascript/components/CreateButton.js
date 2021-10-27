import React from "react"
import Button from '@material-ui/core/Button'

export default function CreateButton(props) {
    console.log(props)
    return (
        <Button href = {props.link} variant = "contained">
            {`New ${props.type}`}
        </Button>
      );
}