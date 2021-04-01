import React from 'react'
import { Alert } from 'react-bootstrap'

export default function AlertMessage({ variant, message}) {

    return (
        <Alert className='text-center py-2 fade' style={{marginTop:'90px'}} variant={variant}>
            {message}
        </Alert>
    )
}
