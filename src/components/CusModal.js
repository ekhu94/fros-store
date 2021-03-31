import React, {useState} from 'react'

export default function CusModal() {

    const [show, setShow] = useState(false)
    return (
        <>
            <Button variant="primary" onClick={()=>setShow(true)}>
            Launch demo modal
            </Button>
    
            <Modal show={show} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}
