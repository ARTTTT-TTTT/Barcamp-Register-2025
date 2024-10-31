import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function CardTop({ data, index }) {


  return (
    <Card elevation={4} sx={{
      backgroundColor: `rgba(255 , 150 , 55 , ${4 / (index + 1)})`,
      borderRadius: '1rem',
      position: 'relative',
      justifyItems: 'center',
    }}>
      <CardContent sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85px'
      }}>
        <div style={{ textAlign: 'center' , maxWidth : "170 px", marginRight : "38px",}}>
          <Typography
            fontWeight='bold'
            noWrap
            textOverflow='ellipsis'
            paddingTop={'5px'}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              whiteSpace: 'pre-wrap',
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            variant='h6'
            pr={"10px"}
          >
            {data.title}
          </Typography>
          <Typography
            fontWeight='normal'
            variant='h6'
          >
            by {data.speaker}
          </Typography>
        </div>
        <div style={{ position : "absolute", right : "0",margin : "12px" }}>
        <Typography fontWeight='bold' sx={{
          backgroundColor: '#fff',
          borderRadius: '100%',
          width: '1rem',
          height: '1rem',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} variant='h6'>{data.votes}</Typography></div>
      </CardContent>
      
    </Card>
  )
}

export default CardTop