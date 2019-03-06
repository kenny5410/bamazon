# bamazon

## What
Bamazon is a node based application which uses a mySQL database and allows users to see an inventory of products, select an item, and the quantity they would like to buy.

## How
The below steps will walk you through how the application works

1. In the command line type in **node bamazonCustomer.js** and hit enter.
2. After hitting enter the user will be presented with the following information.
- The inventory of the products currently available
- The first question asking the user **Enter the ID for the product you would like to buy**

**Here is what the start of the application will look like**

![First Screenshot](/assets/bamazon1.png?raw=true "First Screenshot")

3. Now the user should enter the ID for the corresponding product from the table and hit enter.
4. Next the user should enter the number of items they would like to purchase.

**In the below example, 9 is entered for the ID which selects the Hammer product and 3 is entered for the quantity the user is looking to purchase.**

![Second Screenshot](/assets/bamazon2.png?raw=true "Second Screenshot")

5. If the there is enough quantity in stock for the product selected by the user the following information is presented.
- A thank you message confirming the order was succesful.
- The total price which is quantity multiplied by the price of the product.
- An updated inventory to show that quantity selected was subtracted from the original inventory. 

**In the below example, the order is succesful with the Hammer inventory going down by 3 and the user is charged $10.50 which is the quanity (3) multipled by the price (3.50).**

![Third Screenshot](/assets/bamazon3.png?raw=true "Third Screenshot")

6. If the quantity enter by the user is more than the quantity available in the database the following will occurr.
- The quantity entered by the user will **not** be subtracted from the database.
- A message will be logged that the selected quantity is not in stock.

**In the below example, the order is unsuccesful since the quantity selected by the user, 93 Hammers, excedes the inventory for the Hammer which is 92**

![Fourth Screenshot](/assets/bamazon4.png?raw=true "Fourth Screenshot")

The following Node packages are used to make this application work.

- Inquire
- mySQL
