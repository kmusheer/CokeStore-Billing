const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose');
const app = express()
var cors = require('cors')
// const userRoutes = require("./routes/User");
// const billRoutes = require("./routes/Bill");
const menuRoutes = require("./routes/Menu");
const port = 8000


app.use(cors())


main().catch(err => console.log('err', err))

// Use bodyParser middleware to parse incoming JSON requests
// app.use(bodyParser.json());
app.use(express.json()); // to parse req.body

// app.use('/users', userRoutes);
// app.use('/bills', billRoutes);
app.use('/menus', menuRoutes);

app.get("/", (req, res) => {
    res.send("Hello Express");
  });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/cokeRestaurent');
    console.log("Database connected");
    // console.log(mongoose.connection.name);
}


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})