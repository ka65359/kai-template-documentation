const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Make public dir available on server
app.use("/public", express.static("public"));

// Sample API endpoint
app.get("/kai-api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// Every time / is accessed....
app.get("/", (req, res) => {
  res.send("An alligator approaches!");
  console.log("We got a request!");
});

// Make requests to the API on port 4400
const port = process.env.API_PORT || 4400;
const server = app.listen(port, () =>
  console.log("kai-api is running on localhost:" + process.env.API_PORT)
);

// Debug server connections
/*
setInterval(() => server.getConnections(
    (err, connections) => console.log(`${connections} connections currently open`)
), 1000);
*/

// Gracefully handle exiting
process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

let connections = [];
server.on("connection", (connection) => {
  connections.push(connection);
  connection.on(
    "close",
    () => (connections = connections.filter((curr) => curr !== connection))
  );
});

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);

  connections.forEach((curr) => curr.end());
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
}
