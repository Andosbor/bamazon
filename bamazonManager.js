var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
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
                console.log(res[0].stock_quantity);

                if(answer.productQuantity > res[0].stock_quantity){
                    console.log("We don't have that many in our stock...")
                }

                else if(answer.productQuantity <= res[0].stock_quantity){
                    //subtract answer.productQuantity from res[0].stock_quantity and update the answer as the new res[0].stock_quantity in the database
                    var newQuantity = res[0].stock_quantity - answer.productQuantity;
                    console.log(newQuantity);

                    console.log("Updating product quantity\n");
                    var updateQuery = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: answer.productID
                            }
                        ],
                    )
                    console.log(updateQuery.sql);
                    connection.end();
                }
                    
                else{
                    console.log("Please enter a valid id and/or quantity")
                }

            })




                //if request is too high, say ineffecient quantity
                //if the user can buy the amount they want, update the quantity of that product in the server
                                                        // show the user their receipt by using the cost of the item and how much they bought

        
    });
}