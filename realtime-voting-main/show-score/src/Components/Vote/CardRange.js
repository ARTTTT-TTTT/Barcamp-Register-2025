import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function CardRange({ data }) {
    return (
        <Card sx={{ borderRadius : '1rem' }} elevation={4}>
            <CardContent sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems : 'center'
            }}>
                <Typography fontWeight='bold' noWrap textOverflow='ellipsis' sx={{ width: '18rem' }} variant='h6'>{data.title}</Typography>
                <Typography sx={{
                    backgroundColor: '#FF9847',
                    borderRadius: '100%',
                    width: '0.05rem',
                    height: '0.05rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} variant='h6' fontWeight='bold'>{data.votes}</Typography>
            </CardContent>
        </Card>

    )
}

export default CardRange