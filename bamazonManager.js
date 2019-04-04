var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3307,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  userChoices();
});

function userChoices() {
    inquirer
        .prompt([
            {
                name: "productID",
                type: "userInput",
                message: "What is the id of the product you would like to buy?"
            },
            {
                name: "productQuantity",
                type: "userInput",
                message: "How many would you like to buy?"
            }
        ]).then(function(answer){
            console.log(answer.productID);
            var query = "SELECT item_id, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.productID }, function(err, res) {
                console.log(res[0]);

                /*
                for (var i = 0; i < res.length; i++) {
                    console.log("Position: " + res[i].item_id + " || stock_quantity: " + res[i].stock_quantity);
                  }
                */

            })
        
        
            //Use productQuantity to check if the user can buy the amount they want
            //if (answer.productQuantity > answer.productID)
                                        //must find a way to use answer.productID to get the stock quantity of that ID in the database******



                //if request is too high, say ineffecient quantity
                //if the user can buy the amount they want, update the quantity of that product in the server
                                                        // show the user their receipt by using the cost of the item and how much they bought

            connection.end();
        });
}