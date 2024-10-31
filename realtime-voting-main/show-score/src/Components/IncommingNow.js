import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function IncommingNow({ title, callback }) {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
        let delay = setTimeout(() => {
            setShow(false)
            callback(title)
        }, 30000);

        return () => clearTimeout(delay)
    }, [])

    return (
        <AnimatePresence>
            {show &&
                <motion.div
                    key={title}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ translateY: 500, scale: 0, opacity: 0, transition: { duration: 0.5 } }}>
                    <Card elevation={5} sx={{ position: 'relative', height: '300px' }}>
                        <CardContent sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '90%'
                        }}>
                            <Typography sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                whiteSpace: 'pre-wrap',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical"
                            }} variant='h4'>{title}</Typography>
                        </CardContent>
                        <motion.div
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 30 }}
                            style={{
                                backgroundColor: '#52cfe3',
                                width: '100%',
                                height: '0.4rem',
                                position: 'absolute',
                                bottom: 0
                            }} />
                    </Card>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default IncommingNow