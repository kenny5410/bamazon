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
    console.log("connected as ID " + connection.threadId);
});

function runSearch() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
            console.table(res);
    });
}

function askQuestions() {
    inquirer
        .prompt([
            {
                name: "buy",
                type: "input",
                message: "Enter the ID for the product you would like to buy: ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            var query = "SELECT * FROM products";
            connection.query(query, function(err, res) {
                console.table("hello");
            });
        });
}
runSearch();
//askQuestions();