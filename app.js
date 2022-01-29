const WebSocket = require('ws')
const cors = require('cors')
const express = require('express')
const res = require('express/lib/response')
const app = express()

let wsServer = new WebSocket.Server({port: 8881})
let users = []
let userId = []
let messages = []

wsServer.on('connection',(ws)=>{
    let user = {connection : ws}
    users.push(user)
    userId.push(users.indexOf(user))
    
    ws.on('message',(mess)=>{
        
        let message = mess.toString()
        let data = JSON.parse(message)
        messages.push(new Date().toString().split(" ")[4] + ":" +  data.message + ", id :" + users.indexOf(user)+ '_client')
    })
})

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>
{
    res.send(messages)
})

app.get('/api/messages',(req,res)=>
{
    res.json({messagesFromServer:messages,userId:userId})  
})

app.post('/api/messages',(req,res)=>
{
    let id = req.body.id
    let answer = req.body.answer
    if (id && answer)
    {
        users[id].connection.send(answer)
        res.status(201).json({id:id,answer:answer})
        messages.push(new Date().toString().split(" ")[4] + ":" +  answer + ", id :" + id+'_server')
    }
})

app.delete('/api/clear',(req,res)=>{
    messages = []
    userId = []
    users = []
    res.json(JSON.stringify({message:'cleared'}))
    wsServer.clients.forEach(socket=>{
        socket.close()
    })
})

app.listen(8882)