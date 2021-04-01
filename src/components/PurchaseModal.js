import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function PurchaseModal({showPurchaseModal, setShowPurchaseModal}) {

    const handleClose = () => setShowPurchaseModal(false)

    return (
        <>
            <Modal show={showPurchaseModal} onHide={handleClose} backdrop='static' className="mt-5">
                <Modal.Header style={{margin: '10px'}}>
                    <Modal.Title>Purchase Complete!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>Thank you! Your order was placed successfully.</Modal.Body>
                <Modal.Footer style={{margin: '10px'}}>
                    <Button href="/orders" style={{marginRight: '1rem'}} variant="secondary" onClick={handleClose}>
                    Order History
                    </Button>
                    <Button href='/' style={{marginRight: '1rem'}} variant="dark" onClick={handleClose}>
                    Home
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}