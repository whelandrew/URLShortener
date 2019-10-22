// Require express module
const express = require("express");
const app = express();
const PORT = 7000;

const mongoURI = "mongodb://localhost/urlshortner";
const mongoose = require("mongoose");
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};

require('./models/UrlShorten')
require("./routes/urlshorten")(app);

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, er);
  console.log(`Connected to MongoDB`);
});

//Start server on Port 7000
app.listen(PORT, () => {
 console.log(`Server started on port`, PORT);
});