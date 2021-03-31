import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function AddModal({showModal, setShowModal}) {

    const handleClose = () => setShowModal(false)

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header style={{margin: '10px'}}>
                    <Modal.Title>F R O S</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>You've added this item to your cart</Modal.Body>
                <Modal.Footer justify style={{margin: '10px'}}>
                    <Button style={{marginRight: '1rem'}} variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button href='/cart' style={{marginRight: '1rem'}} variant="dark" onClick={handleClose}>
                    Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
