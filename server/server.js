const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");


app.use(logger("dev"));
app.use(cors());
app.use(express.json());


//DataBase 

const url = `mongodb+srv://ronbe:j0qBFEBUPcJbPHfc@cluster0.y6sau7w.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`);
  });

// Port

const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});


//Routes

const userSystemRouter = require("./user/routes/userSystem");
const restUserSystemRouter = require("./user/routes/restPassword");

const categorySystemRouter = require("./Category/routes/categorySystem");
const productSystemRouter = require("./product/routes/productSystem");


app.use("/users", userSystemRouter);
app.use("/rest", restUserSystemRouter);

app.use("/categories", categorySystemRouter);
app.use("/products", productSystemRouter);











module.exports = app;
