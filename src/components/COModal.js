import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function COModal({showCOModal, setShowCOModal}) {

    const handleClose = () => setShowCOModal(false)

    return (
        <>
            <Modal show={showCOModal} onHide={handleClose} backdrop='static'>
                <Modal.Header style={{margin: '10px'}}>
                    <Modal.Title>F R O S</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>
                    Please <a href='/signup' style={{color:'black'}}>Signup</a> or <a href='/login' style={{color:'black'}}>Login</a></Modal.Body>
                <Modal.Footer style={{margin: '10px'}}>
                    <Button style={{marginRight: '1rem'}} variant="secondary" onClick={handleClose}>
                    Got it
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}