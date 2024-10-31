const express = require('express')
const { default: mongoose } = require('mongoose')
const config = require('./config')
const app = express()
const TopicModel = require('./models/Topic')
const cors = require('cors')

mongoose.set('strictQuery', true);

// mongoose.connect(`${config.databaseURL}/Topics?authSource=admin`).then(() => {
//     console.log("Connected To Database.")
// }).catch((err) => {
//     console.error(err)
// })

mongoose.connect(`${config.databaseURL}`).then(() => {
    console.log("Connected To Database.")
}).catch((err) => {
    console.error(err)
})

app.use(express.json())
app.use(cors())

let clients = []

const sendEventToAll = (data) => {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`))
}

app.get('/api/sse', (req, res) => {

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no'
    };
    res.writeHead(200, headers);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        res
    };

    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
})

//Add Topic
app.post('/api/add_topic', async (req, res) => {
    const { topics } = await req.body

    await topics.forEach(async element => {
        let category = ""
        if (element.category === 0) {
            category = "Basic"
        }
        if (element.category === 1) {
            category = "Intermediate"
        }
        if (element.category === 2) {
            category = "Advance"
        }
        const topic = await new TopicModel({ title: element.title, speaker: element.speaker, long_duration: element.long_duration, category })
        await topic.save()
    });
    await res.status(200).send({ message: `Now Added ${topics.map(e => e.title)}` })
    sendEventToAll({ topics, event: 'add' })
})

//User Vote
app.post('/api/voted', async (req, res) => {

    const { user, id } = req.body
    const topic_selection = await TopicModel.findOne({ _id: id })
    const all_topics = await TopicModel.find({})
    let count_vote = 0
    const Istime = await mongoose.connection.db.collection('console').find().toArray()
    if (Istime[0]?.vote) {
        for (let i = 0; i < all_topics.length; i++) {

            if (all_topics[i].votes.includes(user)) {
                count_vote += 1
            }

            if (count_vote >= config.limitVote) {
                break
            }

        }
        let status = false

        if (await topic_selection.votes.includes(user)) {

            topic_selection.votes = await topic_selection.votes.filter(e => e !== user)
            status = false
            await topic_selection.save()
            sendEventToAll({ user, id, votes: topic_selection.votes.length, event: 'vote' })
            res.status(200).send({ user, id, status: status })

        } else {

            if (count_vote >= config.limitVote) {
                res.status(200).send({ message: "Vote to limit." })
            } else {

                await topic_selection.votes.push(user)
                status = true
                await topic_selection.save()
                sendEventToAll({ user, id, votes: topic_selection.votes.length, event: 'vote' })
                res.status(200).send({ user, id, status: status })
            }

        }

    } else {
        res.status(404).send({ message: "Not time to vote." })
    }

})

//Get Topics
app.get('/api/topics', async (req, res) => {
    const user = req.query.user
    const topics = await TopicModel.find({})
    const topics_to_send = []
    const Istime = await mongoose.connection.db.collection('console').find().toArray()

    if (Istime[0]?.vote) {
        for (let i = 0; i < topics.length; i++) {
            let userInVote = topics[i].votes.includes(user)
            topics_to_send.push({
                _id: topics[i]._id,
                title: topics[i].title,
                votes: topics[i].votes.length,
                speaker: topics[i].speaker,
                long_duration: topics[i].long_duration,
                category: topics[i].category,
                status: userInVote
            })
        }
    }

    res.status(200).send({ topics_to_send, Istime: Istime[0]?.vote })
})

//Get Topics admin
app.get('/api/topics_admin', async (req, res) => {

    const topics = await TopicModel.find({})
    const topics_to_send = []

    for (let i = 0; i < topics.length; i++) {
        topics_to_send.push({
            _id: topics[i]._id,
            title: topics[i].title,
            votes: topics[i].votes.length,
            speaker: topics[i].speaker,
            long_duration: topics[i].long_duration,
            category: topics[i].category
        })
    }

    res.status(200).send({ topics_to_send: topics_to_send })
})

app.listen(config.port, () => {
    console.log("Server is Running...")
})
