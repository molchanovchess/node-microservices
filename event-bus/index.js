const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  const services = [
    "http://posts-clusterip-srv:4001/events",
    "http://comments-srv:4002/events",
    "http://query-srv:4003/events",
    "http://moderation-srv:4004/events"
  ];

  const axiosPromises = services.map((service) =>
    axios.post(service, event).catch((error) => {
      console.error(`Error posting to ${service}:`, error.message);
    })
  );

  await Promise.all(axiosPromises);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
