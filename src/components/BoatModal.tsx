import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {Boat} from '../model/Boat';
import '../styles.css';

interface BoatModalProps {
    show: boolean;
    handleClose: () => void;
    boat: Boat | null;
    onSave: (boat: Boat) => void;
    onCreate: (boat: Boat) => void;
    editable: boolean;
    creation: boolean
}

const BoatModal: React.FC<BoatModalProps> = ({show, handleClose, boat, onSave, onCreate, editable, creation}) => {
    const [editedBoat, setEditedBoat] = useState<Boat | null>(boat);

    useEffect(() => {
        setEditedBoat(boat);
    }, [boat]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedBoat((prevBoat) => (prevBoat ? {...prevBoat, [name]: value} : null));
    };

    const handleSave = () => {
        if (creation && editedBoat) {
            onCreate(editedBoat)
        } else if (editedBoat) {
            onSave(editedBoat);
        }
        handleClose();
    };

    if (!editedBoat) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton={false}>
                <Modal.Title>{editable ? 'Edit Boat' : 'Boat Details'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formBoatName">
                        <Col sm={9}>
                            <Form.Label column sm={3} className="form-label">Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editedBoat.name}
                                onChange={handleChange}
                                readOnly={!editable}
                                className="form-control-spacing"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBoatDescription">
                        <Col sm={9}>
                            <Form.Label column sm={3} className="form-label">Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={editedBoat.description}
                                onChange={handleChange}
                                readOnly={!editable}
                                className="form-control-spacing"
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {editable ? 'Cancel' : 'Close'}
                </Button>
                {editable && (
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                )}

            </Modal.Footer>
        </Modal>
    );


}

export default BoatModal;
