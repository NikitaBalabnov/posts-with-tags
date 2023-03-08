import React, { FC, useState } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";

import { Tags } from "../../../types/NoteT";

type Props = {
  show: boolean;
  handleClose: () => void;
  availibleTags: Tags[];
  deleteTags: (id: string) => void
  onEditTag: (id: string, label: string) => void
};

const EditTagsModal: FC<Props> = ({ show, handleClose, availibleTags, deleteTags, onEditTag }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {availibleTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control  type="text" value={tag.label} onChange={(e) => onEditTag(tag.id, e.target.value)}/>
                  </Col>
                  <Col xs='auto'>
                    <Button onClick={() => deleteTags(tag.id)} variant="outline-danger">&times;</Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTagsModal;
