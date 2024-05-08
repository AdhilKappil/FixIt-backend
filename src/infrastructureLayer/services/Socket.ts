import { Server, Socket } from "socket.io";
import { createServer as createHttpServer, Server as HttpServer } from "http";

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
//   private readonly userRepository: UserRepository;

  constructor(httpServer: HttpServer) {
    // this.userRepository = userRepository;
    this.httpServer = httpServer;
    this.io = new Server(httpServer, {
      cors: {
        origin:"http://localhost:9000",
      }
    //   path: "/socket-chat/",
    });

    this.io.on("connection", this.handleConnection);
  }

  //to create a room of all the students with particular classRoomId
  private handleConnection = (socket: Socket): void => {
    
    this.io.on("connection",(socket)=>{
        console.log("a user connected.");
        this.io.emit("welcome", "hello this is socket server!")
    })
  
  };

}