const express = require("express");
const app = express();

app.use(express.json());

const attendees = [];

app.post("/event-entry", (req, res) => {
  const { name, age, nationality, religion } = req.body;

  const isEligible =
    Number(age) >= 18 &&
    nationality?.toLowerCase() === "nigerian" &&
    religion?.toLowerCase() === "adventist";

  if (!isEligible) {
    return res.status(403).json({
      message: "You are not eligible for this event."
    });
  }

  const attendee = { name, age, nationality, religion };
  attendees.push(attendee);

  res.status(201).json({
    message: "You are eligible to enter the event.",
    attendee
  });
});

app.get("/attendees", (req, res) => {
  res.status(200).json({
    total: attendees.length,
    attendees: attendees
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));