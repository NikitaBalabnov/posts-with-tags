export type Note = {
  id: string;
} & NewNoteData;

export type NewNoteData = {
  text: string;
  title: string;
  tags: Tags[];
};

export type Tags = {
  id: string;
  label: string;
};

export type RawNoteData = {
  text: string;
  title: string;
  tagsId: string[];
};
export type RawNote = {
  id: string;
} & RawNoteData;

export type SimplifiedNote = {
  tags: Tags[];
  title: string;
  id: string;
};
