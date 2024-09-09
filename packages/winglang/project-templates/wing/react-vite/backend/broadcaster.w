bring cloud;
bring websockets;
bring ui;

pub class Broadcaster {
  pub url: str;
  server: websockets.WebSocket;
  clients: cloud.Bucket;

  new() {
    this.server = new websockets.WebSocket(name: "counter_updates") as "counter_updates";
    this.url = this.server.url;
    this.clients = new cloud.Bucket();
    
    // upon connection, add the client to the list
    this.server.onConnect(inflight(id: str): void => {
      this.clients.put(id, "");
    });

    // upon disconnect, remove the client from the list
    this.server.onDisconnect(inflight(id: str): void => {
      this.clients.delete(id);
    });

    // Custom resource display in Console UI
    // hide the websockets server and cloud bucket resources from the Console UI
    nodeof(this.server).hidden = true;
    nodeof(this.clients).hidden = true;
  }

  // send a message to all clients
  pub inflight broadcast(messgae: str) {
    for id in this.clients.list() {
      this.server.sendMessage(id, messgae);
    }
  }
}
