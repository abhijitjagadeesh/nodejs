const express = require('express');
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

const USERS = [
  {id: "1", user: "user1"},
  {id: "2", user: "user2"},
  {id: "3", user: "user3"},
  {id: "4", user: "user4"},
  {id: "5", user: "user5"},
  {id: "6", user: "user6"},
  {id: "7", user: "user7"},
  {id: "8", user: "user8"},
  {id: "9", user: "user9"},
  {id: "10", user: "user10"},
  {id: "11", user: "user11"},
  {id: "12", user: "user12"},
  {id: "13", user: "user13"},
  {id: "14", user: "user14"},
];
const LIMIT = 3;


app.get("/users", (req, res) => {
  
  const numberOfPages = Math.ceil(USERS.length / LIMIT);
  let result = {}
  let startIndex = null;
  let endIndex = null;
  const previous = {page: "None", limit: "None"}
  const next = { page: "None", limit: "None" }
  let invalidRequest = false;

  const page = req.query.page ? parseInt(req.query.page) : 1;

  if (page > numberOfPages || page <= 0) {
    invalidRequest = true;
  }

  //Handle first page
  if (page == 1) {
    previous.page = "None";
    previous.limit = "None";
    next.page = page + 1;
    next.limit = LIMIT;
    startIndex = 0;
    endIndex = startIndex + LIMIT;
  }
  
  // Handle in between pages
  if (page > 1 && page < numberOfPages) {
    previous.page = page - 1;
    previous.limit = LIMIT;
    next.page = page + 1;
    next.limit = LIMIT;
    startIndex = (page -1) * LIMIT;
    endIndex = startIndex + LIMIT
  }

  // Handle last page
  if (page == numberOfPages) {
    previous.page = page - 1;
    previous.limit = LIMIT;
    next.page = "None";
    next.limit = "None";
    startIndex = (page - 1) * LIMIT;
    endIndex = USERS.length;
  }


  //Send API response
  if (invalidRequest) {
    res.send(`Invalid query parameter 'page' value is ${page} Should be > 0 and not more than ${numberOfPages}`)
  } else {
    result.previous = previous;
    result.next = next;
    result.users = USERS.slice(startIndex, endIndex);
    res.send(result);
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server Listening on port ${SERVER_PORT}`)
});