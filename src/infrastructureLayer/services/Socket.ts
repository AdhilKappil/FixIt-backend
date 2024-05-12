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

    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log(text,"1111133");
        console.log('users',this.users);
        
      const user = this.getUser(receiverId);
      if (user) {
        this.io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        // Handle error when user is not found
        console.log("User not found!");
      }
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

  // get user by userId
  getUser(userId: string): IUser | undefined {
    return this.users.find((user) => user.userId === userId);
  }
}
