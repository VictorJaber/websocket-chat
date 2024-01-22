import express  from "express";
import {createServer} from "node:http"
import { Server, Socket } from "socket.io";

const firstMessage = { username: "Admin", content: "Welcome to our chat"}
const messagesDatabase = [firstMessage]

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static("public"))

app.get("/messages", (req, res) => res.json(messagesDatabase))


io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on ("message_sent", (messageData)=> {
        console.log(`New Message:${messageData}`)
        const newMessage = {username:`username: ${socket.id}`, content:`${messageData}`}
        messagesDatabase.push(newMessage)

        io.emit ("message_received", newMessage)
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`)
    })
})


server.listen(3000, () => {
    console.log("Server Started!")
} )