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
  showTable();
  userChoices();
});
function showTable(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);

      });
}

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
            var query = "SELECT item_id, stock_quantity, price, product_name FROM products WHERE ?";
            connection.query(query, { item_id: answer.productID }, function(err, res) {
                console.log("\nItem: " + res[0].product_name)
                console.log("stock quantity: " + res[0].stock_quantity);
                console.log("price of item: $" + res[0].price);

                if(answer.productQuantity > res[0].stock_quantity){
                    console.log("We don't have that many in our stock...")
                    connection.end();
                }

                else if(answer.productQuantity <= res[0].stock_quantity){
                    //subtract answer.productQuantity from res[0].stock_quantity and update the answer as the new res[0].stock_quantity in the database
                    var newQuantity = res[0].stock_quantity - answer.productQuantity;

                    console.log("\nUpdating product quantity\n");
                    connection.query(
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

                    var receipt = answer.productQuantity * res[0].price;
                            //find price of product using id and multiply it by answer.productQuantity
                            console.log("your purchase costs $" + receipt);
                    connection.end();
                }
                    
                else{  
                    console.log("Please enter a valid id and/or quantity")
                    connection.end();
                }

            })




                //if request is too high, say ineffecient quantity
                //if the user can buy the amount they want, update the quantity of that product in the server
                                                        // show the user their receipt by using the cost of the item and how much they bought

        
    });
}