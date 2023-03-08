import React, { FC } from "react";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "../../hooks/useNote";
import {Link, useNavigate} from 'react-router-dom'
import ReactMarkdown from "react-markdown";
type Props = {
  Delete: (id:string) => void;
}
const SingleNote: FC<Props> = ({Delete}) => {
  const note = useNote();
  const navigate = useNavigate()
  function deleteHendler(){
    Delete(note.id)
    navigate('/')
  }
  return (
    <>
      <Row className='align-items-center mb-5'>
        <Col>
          <Stack
            gap={2}
            className='mb-2'
          >
            <h1>{note.title}</h1>
          </Stack>
          {note.tags.length > 0 && (
            <Stack
              direction="horizontal"
              gap={1}
            >
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
            <Stack gap={2} direction="horizontal">
                <Link to={`/${note.id}/edit`}>
                    <Button>Edit</Button> 
                </Link> 
                  <Button onClick={deleteHendler} variant="outline-danger">Delete</Button>
                 <Link to={'..'}>
                    <Button variant="outline-secondary">Back</Button>   
                 </Link>
            </Stack>   
        </Col>
      </Row>
      <ReactMarkdown>{note.text}</ReactMarkdown>
    </>
  );
};

export default SingleNote;
