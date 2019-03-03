var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "3dvVfQ6Wgqm3fK9s",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});


function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
        inquirer
            .prompt([
                {
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
                if (results[answer.selection - 1].stock_quantity > parseInt(answer.quantity)) {
                    var query = "UPDATE products SET stock_quantity = stock_quantity - (?) WHERE ID = ?;"
                    connection.query(query,[answer.quantity, answer.selection], function(err) {
                        console.log("Thank you! Your order has been placed!\n" +
                        "Your total price is: $" + answer.quantity * results[answer.selection - 1].price);
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
