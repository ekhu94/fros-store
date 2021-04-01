import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function PurchaseModal({showRemoveModal, setShowRemoveModal}) {

    const handleClose = () => setShowRemoveModal(false)

    return (
        <>
            <Modal show={showRemoveModal} onHide={handleClose} backdrop='static' className="mt-5">
                <Modal.Header style={{margin: '10px'}}>
                    <Modal.Title>Order Deleted.</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>This order has been removed from your history.</Modal.Body>
                <Modal.Footer style={{margin: '10px'}}>
                    <Button href="/orders" style={{marginRight: '1rem'}} variant="dark" onClick={handleClose}>
                    Got it
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}