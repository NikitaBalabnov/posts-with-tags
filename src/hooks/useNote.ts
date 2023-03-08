import { useOutletContext } from "react-router-dom";
import { Note } from "../types/NoteT";


export function useNote(){
    return useOutletContext<Note>()
}