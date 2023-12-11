

const express = require('express');

const app = express();

const cors = require('cors');

const appwithdetailsofproductsRoutes = require('./Routes/products.js')

app.use(cors());

app.use(express.json());

app.use("/products", appwithdetailsofproductsRoutes);

app.listen("5000", () => {
    console.log("Server started at 5000");
});