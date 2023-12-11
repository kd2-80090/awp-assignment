
const express = require('express');
const mysql = require('mysql2');
const app = express.Router();

const connectDetails = {
    host: "localhost",
    database: "karad",
    user: "kd2_80090_NileshKatkar",
    password: "manager",
}


app.get("/", (request, response) => {
    const connection = mysql.createConnection(connectDetails);
    const statement = "select * from products";
    connection.query(statement, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(result));
            response.end();
        }
        else {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(error));
            response.end();
        }
    })
})

app.post("/", (request, response) => {
    const connection = mysql.createConnection(connectDetails);
    console.log(`requested body is : ${request.body}`);
    const statement = `insert into products values (${parseInt(request.body.productid)},
        '${request.body.producttitle}',${request.body.price},${request.body.stock})`;
    console.log(`Query is : ${statement}`)
    connection.query(statement, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(result));
            response.end();
        }
        else {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(error));
            response.end();
        }
    })
})

app.put("/:productid", (request, response) => {
    console.log(`requested parameter received is : ${request.params.productid}`);
    console.log(`requested body is : ${request.body}`);
    const connection = mysql.createConnection(connectDetails);
    const statement = `update products set producttitle = '${request.body.producttitle}',price = ${request.body.price},stock = ${request.body.stock}
                        where productid = ${parseInt(request.params.productid)}`;
    console.log(`Query is : ${statement}`)
    connection.query(statement, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(result));
            response.end();
        }
        else {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(error));
            response.end();
        }
    })
})

app.delete("/:productid", (request, response) => {
    console.log(`requested parameter received is : ${request.params.productid}`);
    console.log(`requested body is : ${request.body}`);
    const connection = mysql.createConnection(connectDetails);
    const statement = `delete from products
                        where productid = ${request.params.productid}`;
    console.log(`Query is : ${statement}`)
    connection.query(statement, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(result));
            response.end();
        }
        else {
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(JSON.stringify(error));
            response.end();
        }
    })
})

module.exports = app;