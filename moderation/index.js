const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
    console.log('inside app.post')
  const { type, data } = req.body;
  console.log( type, data)

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    console.log(status)
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4004, () => {
  console.log("Listening on 4004");
});
