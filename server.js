const express=require('express')
const cors=require('cors')
const http=require('http')
const socket=require('socket.io')

const PORT=4600
// create a reference of express
const app=express()
const server=http.createServer(app)


// socket

const io=new socket.Server(server)

// io event

io.on('connection',(socket)=>{
    socket.on('send name',(username)=>{
        // console.log(username)
        io.emit('send name',(username))
    })
    socket.on('send message',(chat)=>{
        // console.log(chat)
        io.emit('send message',(chat))
    })
})
// body parser middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// cors-cross origin resource sharing

app.use(cors())

// current folder as static
app.use(express.static('./'))
app.get(`/`,(req,res)=>{
    res.sendFile(__dirname +'index.html')
})

// server  listen method

server.listen(PORT,()=>{
    // console.log(`server is listening at the port http://localhost:${PORT}`)
})