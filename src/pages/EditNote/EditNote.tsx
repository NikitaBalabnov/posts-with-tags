import React, { FC } from "react";
import { useNote } from "../../hooks/useNote";
import { NewNoteData, Tags } from "../../types/NoteT";
import NoteForm from "../NewNote/components/NoteForm";

type Props = {
  onSubmit: (id: string, data: NewNoteData) => void;
  onAddTag: (data: Tags) => void;
  availibleTags: Tags[];
};

const EditNote: FC<Props> = ({ onSubmit, onAddTag, availibleTags}) => {
    const note = useNote()
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        text={note.text}
        tags={note.tags}
        onAddTag={onAddTag}
        availibleTags={availibleTags}
        onSubmit={(data) => onSubmit(note.id, data)}
      />
    </>
  );
};

export default EditNote;
