const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const { logErrors , errorHandler, boomeErrorHandler } = require("./middlewares/error.handler");

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ["http://localhost:8080" , "http://localhost:myapp.co"]; //Delimita las direcciones que pueden mandar una peticion
const options = {
  origin : (origin , callback) => {
    if(whitelist.includes(origin)) {
      callback(null , true);
    } else {
      callback( new Error ("No permitir"))
    }
  }
}
app.use(cors());

app.get("/" , (req , res) => {
  res.send("Hello world in express")
})

app.get("/nueva-ruta" , (req , res) => {
  res.send("soy la ruta nueva")
})

routerApi(app);

app.use(logErrors);
app.use(boomeErrorHandler);
app.use(errorHandler);

app.listen(port , ()=> {
  console.log("Miport" + port)
})
