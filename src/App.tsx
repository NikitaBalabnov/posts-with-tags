import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NewNote from './pages/NewNote/NewNote'
import { useLocaleStorage } from './hooks/useLocaleStorage'
import { RawNote, Tags, NewNoteData } from './types/NoteT'
import {  useMemo } from 'react'
import {v4 as uuidV4} from 'uuid'
import NoteList from './pages/NoteList/NoteList'
import LayoutNote from './components/LayoutNote'
import SingleNote from './pages/SingleNote/SingleNote'
import EditNote from './pages/EditNote/EditNote'
function App() {

const [notes, setNote] = useLocaleStorage<RawNote[]>('NOTE', [])
const [tags, setTags] = useLocaleStorage<Tags[]>('TAGS', [])

const noteWithTags = useMemo(() =>{
  return notes.map(note =>{
    return {...note, tags: tags.filter(tag => note.tagsId.includes(tag.id))}
  })
},[notes, tags]) 
function onSubmit({tags,...data}:NewNoteData){
  setNote(prevNotes => {
    return [
      ...prevNotes,
      {...data, id: uuidV4(), tagsId: tags.map(tag => tag.id)}
    ]
  })
}
function onAddTag(tag:Tags){
  setTags(prev => [...prev, tag])
}
function onEditNote(id:string, {tags, ...data}:NewNoteData){
  setNote(prevNotes => {
    return prevNotes.map(note => {
      if(note.id === id){
        return {...note, ...data, tagsId: tags.map(tag => tag.id)}
      } else {
        return note
      }
    })
  })
}
function deleteNote(id: string){
  setNote(prev => {
    return prev.filter(note => note.id !== id)
  })
}
function deleteTag(id: string){
  setTags(prev => {
    return prev.filter(tag => tag.id !== id)
  })
}
function onEditTag(id: string, label: string){
  setTags(prev => {
    return prev.map(tag => {
      if(tag.id === id){
        return {...tag, label: label}
      }else {
        return tag
      }
    })
  })
}
  return (
    <div className="App">
      <Container className='my-4'>
        <Routes>
        <Route path='/' element={<NoteList availibleTags={tags} deleteTag={deleteTag} onEditTag={onEditTag} notes={noteWithTags}/>}/>
        <Route path='new' element={<NewNote onAddTag={onAddTag} availibleTags={tags} onSubmit={onSubmit}/>}/>
        <Route path='/:id' element={<LayoutNote notes={noteWithTags}/>}>
          <Route index element={<SingleNote Delete={deleteNote}/>}/>
          <Route path='edit' element={<EditNote  onSubmit={onEditNote} onAddTag={onAddTag} availibleTags={tags}/>}/>
        </Route>
        <Route path='*' element={<h1>Error</h1>}/>
      </Routes>
      </Container>
    </div>
  )
}

export default App
