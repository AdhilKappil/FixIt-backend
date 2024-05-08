import { Server, Socket } from "socket.io";
import { createServer as createHttpServer, Server as HttpServer } from "http";

interface IUser {
    userId: string;
    socketId: string;
}

export class SocketManager {
    private httpServer: HttpServer;
    private io: Server;
    private users: IUser[] = [];
  
    constructor(httpServer: HttpServer) {
        this.httpServer = httpServer;
        this.io = new Server(httpServer, { 
            cors: {
                origin: "http://localhost:9000",
            },
        });

        this.io.on("connection", this.handleConnection);
    }

    private handleConnection = (socket: Socket): void => {
        // when user connect
        console.log("a user connected.");

        // add user id and socket id 
        socket.on("addUser", (userId: string) => {
            this.addUser(userId, socket.id);
        });

        // when user disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            this.removeUser(socket.id);
            this.io.emit("getUsers", this.users);
        });
    };

    // add user id and socket id 
     addUser(userId: string, socketId: string): void {
        if (!this.users.some((user) => user.userId === userId)) {
            this.users.push({ userId, socketId });
            this.io.emit("getUsers", this.users);
        }
    }

    // remove user here
     removeUser(socketId: string): void {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }
}
 