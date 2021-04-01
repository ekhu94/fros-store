import React from 'react'
import { Alert } from 'react-bootstrap'

export default function AlertMessage({ variant, message}) {

    return (
        <Alert className='text-center py-3 fade' style={{marginTop:'90px', marginBottom: '0', letterSpacing: '0.2rem'}} variant={variant}>
            {message}
        </Alert>
    )
}
