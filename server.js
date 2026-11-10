const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

function timestampResponse(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}

app.get("/api/:date?", (request, response) => {
  const { date } = request.params;
  const parsedDate = date === undefined
    ? new Date()
    : /^\d+$/.test(date)
      ? new Date(Number(date))
      : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return response.status(400).json({ error: "Invalid Date" });
  }

  return response.json(timestampResponse(parsedDate));
});

app.listen(port, () => {
  console.log(`Timestamp microservice listening on port ${port}`);
});
