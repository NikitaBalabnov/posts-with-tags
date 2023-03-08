import React, { FC, useEffect } from 'react'
import { Badge, Card, Stack } from 'react-bootstrap'
import { SimplifiedNote } from '../../../../types/NoteT'
import {Link} from 'react-router-dom'
import style from '../NoteListCard/NoteListCard.module.css'
const NoteListCard:FC<SimplifiedNote> = ({tags, title, id}) => {
  return (
   <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${style.card}`}>
    <Card.Body>
      <Stack gap={2} className='justify-content-center align-items-center mb-2'>
        <span className='fs-5'>{title}</span>
      </Stack>
      {tags.length > 0 && (
        <Stack className='flex-wrap justify-content-center ' direction='horizontal' gap={1}> 
          {tags.map(tag => (
            <Badge className='text-truncate' key={tag.id}>{tag.label}</Badge>
          ))}
        </Stack>
      )}
    </Card.Body>
   </Card>
  )
}

export default NoteListCard