import React, { FC } from "react";
import { NewNoteData, Tags } from "../../types/NoteT";
import NoteForm from "./components/NoteForm";

type Props = {
  onSubmit: (data: NewNoteData) => void;
  onAddTag: (data:Tags) => void;
  availibleTags: Tags[]
};

const NewNote:FC<Props> = ({onSubmit, onAddTag, availibleTags}) => {
  return (
    <>
      <h1 className="mb-4">NewNote</h1>
      <NoteForm onAddTag={onAddTag} availibleTags={availibleTags} onSubmit={onSubmit} />
    </>
  );
};

export default NewNote;
