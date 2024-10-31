import CardTopic from './Components/CardTopic';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Box, Card, Grid , Button } from '@mui/material';
import { motion } from 'framer-motion'

import Loading from './Components/Loading';
import Incoming from './Components/Incoming';
import IncommingNow from './Components/IncommingNow';
import backend from './Services/backend';
import ReconnectingEventSource from 'reconnecting-eventsource';
import config from './config';
import Wave from './Components/FooterWave/Wave';
import { useNavigate } from 'react-router-dom'


function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [topics, setTopics] = useState([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    let current_page = 1
    let time_counting = 1
    let wait_until = 6

    let loop = setInterval(() => {
      if (time_counting < topics.length) {
        if (time_counting % wait_until === 0) {
          // Change Page
          current_page += 1
          setCurrentPage(current_page)
        }
      } else {
        // Return To First Page
        time_counting = 0
        current_page = 1
        setCurrentPage(current_page)
      }

      time_counting += 1

    }, 1000)

    return () => clearInterval(loop)

  }, [topics.length])

  const topicsPerPage = 6

  const [inComingLst, setIncomingLst] = useState([])

  useEffect(() => {

    backend.get('/topics_admin').then(res => {
      let topics = res.data.topics_to_send
      setTopics(topics.map(e => e.title))
      setIsLoading(false);
    })

    const es = new ReconnectingEventSource(config.apiUrlPrefix + '/sse');

    es.onmessage = (event) => {

      let res = JSON.parse(event.data)

      if(res.event === "add"){
        setIncomingLst(pre => pre.concat(res.topics.map(e => e.title)))
      }
    }

    return () => es.close()

  }, [])

  const callback_when_end_incomming = (title) => {

    setTopics(pre => [...pre, title])
    setTimeout(() => {
      setIncomingLst(pre => pre.filter(e => e !== title))
    }, 500);
  }


  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(225,149,0,1) 0%, rgba(231,0,0,1) 100%)' }}>
      <Container maxWidth="xl" sx={{ pb: '6rem' }} >
        <Box sx={{
          display: 'grid',
          gridTemplateRows: '100px 1fr 1fr',
          width: '100%',
          height: '90vh',
          gap: '1rem'
        }}>
          <Box sx={{ width : '100%', textAlign : 'center' , mt : '2rem' }}>
            <Incoming />
          </Box>
          <Card  elevation={5} sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius : '1rem'
          }}>
            {isLoading ? ( <Loading /> ) :
              (<Grid container columns={12} spacing={1} alignItems="center" justifyContent='center'>
                {inComingLst.slice(0,1).map(e =>
                  <Grid key={e} item xl={4}>
                    <motion.div key={e} layout>
                      <IncommingNow key={e} title={e} callback={callback_when_end_incomming} />
                    </motion.div>
                  </Grid>)}
              </Grid>)
            }
          </Card>
          <Card elevation={5} sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius : '1rem'
          }}>
            <Grid
              container
              columns={12}
              spacing={1}
              sx={{
                width: '100%',
                padding: '1rem',
                height : '100%'
              }}
            >
              {topics.slice(topicsPerPage * (currentPage - 1), topicsPerPage * currentPage).map((e, i) =>
                <Grid key={i} item xl={4}>
                  <motion.div
                    layout
                    key={e}
                    initial={{ translateX: 2000 }}
                    animate={{ translateX: 0 }}
                    exit={{ translateX: -2000 }}
                    transition={{ delay: 0.1 * i }}
                    style={{
                      height : '100%'
                    }}
                  >
                    <CardTopic Topic={e} index={i} />
                  </motion.div>

                </Grid>
              )}

            </Grid>
          </Card>
        </Box>
        {/* <Wave/> */}
        <Button sx={{
          position : 'absolute',  
          right : 30,
          bottom : 20,
          color: '#fff',
          fontSize: '18px' 
        }} variant='text' onClick={() => navigate('/vote')}>Next</Button>
      </Container>
    </div>
  );
}

export default App;
