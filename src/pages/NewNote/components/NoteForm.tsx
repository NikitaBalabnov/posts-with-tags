import React, { FC, FormEvent, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import { NewNoteData, Tags } from "../../../types/NoteT";
import { v4 as uuidV4 } from "uuid";
type Props = {
  onSubmit: (data: NewNoteData) => void;
  onAddTag: (data: Tags) => void;
  availibleTags: Tags[];
} & Partial<NewNoteData>

const NoteForm: FC<Props> = ({ onSubmit, onAddTag, availibleTags, title = '', text = '', tags = []}) => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tags[]>(tags);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      text: textRef.current!.value,
      tags: selectedTags,
    });
    navigate('..')
  };
  return (
    <Container fluid={"xxl"}>
      <Form onSubmit={handleSubmit}>
        <Stack className="mb-3" gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatetableReactSelect
                  isMulti
                  options={availibleTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onCreateOption={(label) => {
                    const newTag = {
                      id: uuidV4(),
                      label,
                    };
                    onAddTag(newTag);
                    setSelectedTags((prev) => [...prev, newTag]);
                  }}
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
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              ref={textRef}
              required
              defaultValue={text}
              as={"textarea"}
              rows={15}
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Stack>
        <Stack className="justify-content-end" gap={2} direction="horizontal">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to={".."}>
            <Button variant="light">Go back</Button>
          </Link>
        </Stack>
      </Form>
    </Container>
  );
};

export default NoteForm;
