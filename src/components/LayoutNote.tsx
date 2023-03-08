import React, { FC } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { Note } from '../types/NoteT'

type Props = {
    notes: Note[]
}

const LayoutNote:FC<Props> = ({notes}) => {
    const {id} = useParams()
    const note = notes.find(n => n.id === id)
    if(note == null) return <Navigate to={'/'} replace/>
  return <Outlet context={note}/>
}

export default LayoutNote