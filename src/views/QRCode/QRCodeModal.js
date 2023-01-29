import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import QRCodeReact from 'qrcode.react';

const QRCodeModal = ({ show, onHide, place }) => (
<Modal show={show} onHide={onHide} size="lg" centered>
<Modal.Body className="text-center pt-4">
<Container>
<h3>QR Code for Transportaion Permit Identification</h3>
<div className="mt-4 mb-4">
<h5 className="mb-0 mr-2">

</h5>
</div>
</Container>
</Modal.Body>
</Modal>
);

export default QRCodeModal;