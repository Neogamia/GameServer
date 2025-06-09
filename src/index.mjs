import e from "express";
import http from "http";
import { Server } from "socket.io";
import cassandra from "cassandra-driver";


const port = 7600;
const app = e();
const server = http.createServer(app);
const io = new Server(server);

const cluster = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'users'
});

app.get('/status', (req, res) => {
    res.json({ 'Status': 'Running'});
});

const playerLoc = {
    id: 0,
    x: 0,
    y: 0,
    z: 0,
}

io.on('connection', (socket) => {
    console.log(`Player with session id ${socket.id} joined`);

    

    socket.on('playerLocation', (x, y, z) => {
        playerLoc[socket.id, x, y, z];
    });

    socket.on("disconnect", () => {
        console.log(`Player with session id ${socket.id} disconnected`);
        io.emit("playerDisconnected", `Player with session id ${socket.id} left the game`);
    })
});

server.listen(port, () => {
    console.log(`Running on Port ${port}`);
});


function createAccount(uuid, username, firstname, lastname, email) {
    cluster.execute('INSERT INTO players (user_id, username, firstname, lastname, email, money, mana, health, shield, locx, locy, locz, characterclass, charactername) (')
}