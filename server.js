const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();

var corsOptions = {
    origin: ["http://localhost:8081", "http://localhost:3000"]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
    res.json({message: "welcome to the place!!"})
});

require("./app/routes/quotesRoutes")(app)



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})
