//Node Package Managers used in this application
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

//Creation of the mySQL database

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_Port,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//Connection function which also runs the start function
connection.connect(function(err) {
    if (err) throw err;
    start();
});

//Start function which displays the table and starts the inquirer questions
function start() {
    //This query function will provide a table of the products for the user
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
        inquirer
            .prompt([
                {
                    //The first inquire question asking for the ID of the product the user wants to choose
                    name: "selection",
                    type: "input",
                    message: "Enter the ID for the product you would like to buy: ",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    //The second inquire question asking for the quantity the user would like to choose based on the ID they selected during the previous question
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function(answer) {
                //This will compare the quantity for the ID selected by the user with the quantity in the products table of the database
                if (results[answer.selection - 1].stock_quantity > parseInt(answer.quantity)) {
                    var query = "UPDATE products SET stock_quantity = stock_quantity - (?) WHERE ID = ?;"
                    connection.query(query,[answer.quantity, answer.selection], function(err) {
                        if (err) throw err;
                        console.log("Thank you! Your order has been placed!\n" +
                        "Your total price is: $" + answer.quantity * results[answer.selection - 1].price + "\nHere is the updated inventory.");
                        connection.query("SELECT * FROM products", function(err, results) {
                            if (err) throw err;
                            console.table(results);
                        });
                        connection.end();
                    }
                    )
                }
                else {
                    console.log("Sorry, we do not have that selected quantity in stock.");
                    connection.end();
                }
            });
    });    
}
