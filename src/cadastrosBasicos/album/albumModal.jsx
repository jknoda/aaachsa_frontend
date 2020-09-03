import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Upload from '../../common/upload/upload/Upload'
export default props => {
    const [show, setShow] = useState(props.show);

    function setarShow(valor) {
        setShow(valor);
    }
    const handleClose = () => setarShow(false);

    function informarUpload(dados) {
        props.dados(dados)
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.field.GalDes}
                    <Upload retorno={informarUpload}></Upload>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}