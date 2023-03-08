import React, { FC, useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select'
import { Note, Tags } from "../../types/NoteT";
import EditTagsModal from "./components/EditTagsModal";
import NoteListCard from "./components/NoteListCard/NoteListCard";
type Props = {
    availibleTags: Tags[]
    notes: Note[]
    deleteTag: (id: string) => void
    onEditTag: (id: string, label: string) => void
};

const NoteList:FC<Props> = ({availibleTags, notes, deleteTag, onEditTag}) => {
    const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('')
    const filteredNotes = useMemo(() =>{
       return notes.filter(note => {
         return (
            (title === '' || note.title.toLowerCase().includes(title.toLowerCase()))
            &&
            (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
         )
       })
    },[title, selectedTags, notes])

    function handleClose(){
      setShow(false);
    }
    function handleShow(){
      setShow(true)
    }
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>List</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/new"}>
              <Button>Create</Button>
            </Link>
            <Button onClick={handleShow} variant="light">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form className="mb-4">
        <Row>
            <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} onChange={e => setTitle(e.target.value)} type="text"/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  isMulti
                  options={availibleTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                />
                </Form.Group>
            </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map(note => (
            <Col key={note.id}>
                <NoteListCard id={note.id} title={note.title} tags={note.tags}/>
            </Col>
        ))}
      </Row>
      <EditTagsModal show={show} deleteTags={deleteTag} availibleTags={availibleTags} onEditTag={onEditTag}  handleClose={handleClose}/>
    </>
  );
};

export default NoteList;
