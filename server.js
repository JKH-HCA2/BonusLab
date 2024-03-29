let express = require('express');
let bodyParser = require('body-parser');
let fs = require("fs");
let app = express();

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let products = [
    {
        "ProductID": "1",
        "ProductName": "Chai",
        "UnitPrice": "18.0000",
        "UnitsInStock": "39",
        "CategoryName": "Beverages",
        "Supplier": "Exotic Liquids",
        "Discontinued": "false"
    },
    {
        "ProductID": "2",
        "ProductName": "Chang",
        "UnitPrice": "19.0000",
        "UnitsInStock": "17",
        "CategoryName": "Beverages",
        "Supplier": "Exotic Liquids",
        "Discontinued": "false"
    },
    {
        "ProductID": "3",
        "ProductName": "Aniseed Syrup",
        "UnitPrice": "10.0000",
        "UnitsInStock": "13",
        "CategoryName": "Condiments",
        "Supplier": "Exotic Liquids",
        "Discontinued": "false"
    },
    {
        "ProductID": "4",
        "ProductName": "Chef Anton's Cajun Seasoning",
        "UnitPrice": "22.0000",
        "UnitsInStock": "53",
        "CategoryName": "Condiments",
        "Supplier": "New Orleans Cajun Delights",
        "Discontinued": "false"
    },
    {
        "ProductID": "5",
        "ProductName": "Chef Anton's Gumbo Mix",
        "UnitPrice": "22.3500",
        "UnitsInStock": "0",
        "CategoryName": "Condiments",
        "Supplier": "New Orleans Cajun Delights",
        "Discontinued": "true"
    },
    {
        "ProductID": "6",
        "ProductName": "Grandma's Boysenberry Spread",
        "UnitPrice": "25.0000",
        "UnitsInStock": "120",
        "CategoryName": "Condiments",
        "Supplier": "Grandma Kelly's Homestead",
        "Discontinued": "false"
    },
    {
        "ProductID": "7",
        "ProductName": "Uncle Bob's Organic Dried Pears",
        "UnitPrice": "30.0000",
        "UnitsInStock": "15",
        "CategoryName": "Produce",
        "Supplier": "Grandma Kelly's Homestead",
        "Discontinued": "false"
    },
    {
        "ProductID": "8",
        "ProductName": "Northwoods Cranberry Sauce",
        "UnitPrice": "40.0000",
        "UnitsInStock": "6",
        "CategoryName": "Condiments",
        "Supplier": "Grandma Kelly's Homestead",
        "Discontinued": "false"
    },
    {
        "ProductID": "9",
        "ProductName": "Mishi Kobe Niku",
        "UnitPrice": "97.0000",
        "UnitsInStock": "29",
        "CategoryName": "Meats",
        "Supplier": "Tokyo Traders",
        "Discontinued": "true"
    },
    {
        "ProductID": "10",
        "ProductName": "Ikura",
        "UnitPrice": "31.0000",
        "UnitsInStock": "31",
        "CategoryName": "Seafood",
        "Supplier": "Tokyo Traders",
        "Discontinued": "false"
    },
    {
        "ProductID": "11",
        "ProductName": "Queso Cabrales",
        "UnitPrice": "21.0000",
        "UnitsInStock": "22",
        "CategoryName": "Dairy Products",
        "Supplier": "Cooperativa de Quesos 'Las Cabras'",
        "Discontinued": "false"
    },
    {
        "ProductID": "12",
        "ProductName": "Queso Manchego La Pastora",
        "UnitPrice": "38.0000",
        "UnitsInStock": "86",
        "CategoryName": "Dairy Products",
        "Supplier": "Cooperativa de Quesos 'Las Cabras'",
        "Discontinued": "false"
    },
    {
        "ProductID": "13",
        "ProductName": "Konbu",
        "UnitPrice": "6.0000",
        "UnitsInStock": "24",
        "CategoryName": "Seafood",
        "Supplier": "Mayumi's",
        "Discontinued": "false"
    },
    {
        "ProductID": "14",
        "ProductName": "Tofu",
        "UnitPrice": "23.2500",
        "UnitsInStock": "35",
        "CategoryName": "Produce",
        "Supplier": "Mayumi's",
        "Discontinued": "false"
    },
    {
        "ProductID": "15",
        "ProductName": "Genen Shouyu",
        "UnitPrice": "15.5000",
        "UnitsInStock": "39",
        "CategoryName": "Condiments",
        "Supplier": "Mayumi's",
        "Discontinued": "false"
    },
    {
        "ProductID": "16",
        "ProductName": "Pavlova",
        "UnitPrice": "17.4500",
        "UnitsInStock": "29",
        "CategoryName": "Confections",
        "Supplier": "Pavlova,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "17",
        "ProductName": "Alice Mutton",
        "UnitPrice": "39.0000",
        "UnitsInStock": "0",
        "CategoryName": "Meats",
        "Supplier": "Pavlova,Ltd.",
        "Discontinued": "true"
    },
    {
        "ProductID": "18",
        "ProductName": "Carnarvon Tigers",
        "UnitPrice": "62.5000",
        "UnitsInStock": "42",
        "CategoryName": "Seafood",
        "Supplier": "Pavlova,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "19",
        "ProductName": "Teatime Chocolate Biscuits",
        "UnitPrice": "9.2000",
        "UnitsInStock": "25",
        "CategoryName": "Confections",
        "Supplier": "Specialty Biscuits,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "20",
        "ProductName": "Sir Rodney's Marmalade",
        "UnitPrice": "81.0000",
        "UnitsInStock": "40",
        "CategoryName": "Confections",
        "Supplier": "Specialty Biscuits,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "21",
        "ProductName": "Sir Rodney's Scones",
        "UnitPrice": "10.0000",
        "UnitsInStock": "3",
        "CategoryName": "Confections",
        "Supplier": "Specialty Biscuits,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "22",
        "ProductName": "Gustaf's Knäckebröd",
        "UnitPrice": "21.0000",
        "UnitsInStock": "104",
        "CategoryName": "Grains",
        "Supplier": "PB Knäckebröd AB",
        "Discontinued": "false"
    },
    {
        "ProductID": "23",
        "ProductName": "Tunnbröd",
        "UnitPrice": "9.0000",
        "UnitsInStock": "61",
        "CategoryName": "Grains",
        "Supplier": "PB Knäckebröd AB",
        "Discontinued": "false"
    },
    {
        "ProductID": "24",
        "ProductName": "Guaraná Fantástica",
        "UnitPrice": "4.5000",
        "UnitsInStock": "20",
        "CategoryName": "Beverages",
        "Supplier": "Refrescos Americanas LTDA",
        "Discontinued": "true"
    },
    {
        "ProductID": "25",
        "ProductName": "NuNuCa Nuß-Nougat-Creme",
        "UnitPrice": "14.0000",
        "UnitsInStock": "76",
        "CategoryName": "Confections",
        "Supplier": "Heli Süßwaren GmbH & Co. KG",
        "Discontinued": "false"
    },
    {
        "ProductID": "26",
        "ProductName": "Gumbär Gummibärchen",
        "UnitPrice": "31.2300",
        "UnitsInStock": "15",
        "CategoryName": "Confections",
        "Supplier": "Heli Süßwaren GmbH & Co. KG",
        "Discontinued": "false"
    },
    {
        "ProductID": "27",
        "ProductName": "Schoggi Schokolade",
        "UnitPrice": "43.9000",
        "UnitsInStock": "49",
        "CategoryName": "Confections",
        "Supplier": "Heli Süßwaren GmbH & Co. KG",
        "Discontinued": "false"
    },
    {
        "ProductID": "28",
        "ProductName": "Rössle Sauerkraut",
        "UnitPrice": "45.6000",
        "UnitsInStock": "26",
        "CategoryName": "Produce",
        "Supplier": "Plutzer Lebensmittelgroßmärkte AG",
        "Discontinued": "true"
    },
    {
        "ProductID": "29",
        "ProductName": "Thüringer Rostbratwurst",
        "UnitPrice": "123.7900",
        "UnitsInStock": "0",
        "CategoryName": "Meats",
        "Supplier": "Plutzer Lebensmittelgroßmärkte AG",
        "Discontinued": "true"
    },
    {
        "ProductID": "30",
        "ProductName": "Nord-Ost Matjeshering",
        "UnitPrice": "25.8900",
        "UnitsInStock": "10",
        "CategoryName": "Seafood",
        "Supplier": "Nord-Ost-Fisch Handelsgesellschaft mbH",
        "Discontinued": "false"
    },
    {
        "ProductID": "31",
        "ProductName": "Gorgonzola Telino",
        "UnitPrice": "12.5000",
        "UnitsInStock": "0",
        "CategoryName": "Dairy Products",
        "Supplier": "Formaggi Fortini s.r.l.",
        "Discontinued": "false"
    },
    {
        "ProductID": "32",
        "ProductName": "Mascarpone Fabioli",
        "UnitPrice": "32.0000",
        "UnitsInStock": "9",
        "CategoryName": "Dairy Products",
        "Supplier": "Formaggi Fortini s.r.l.",
        "Discontinued": "false"
    },
    {
        "ProductID": "33",
        "ProductName": "Geitost",
        "UnitPrice": "2.5000",
        "UnitsInStock": "112",
        "CategoryName": "Dairy Products",
        "Supplier": "Norske Meierier",
        "Discontinued": "false"
    },
    {
        "ProductID": "34",
        "ProductName": "Sasquatch Ale",
        "UnitPrice": "14.0000",
        "UnitsInStock": "111",
        "CategoryName": "Beverages",
        "Supplier": "Bigfoot Breweries",
        "Discontinued": "false"
    },
    {
        "ProductID": "35",
        "ProductName": "Steeleye Stout",
        "UnitPrice": "18.0000",
        "UnitsInStock": "20",
        "CategoryName": "Beverages",
        "Supplier": "Bigfoot Breweries",
        "Discontinued": "false"
    },
    {
        "ProductID": "36",
        "ProductName": "Inlagd Sill",
        "UnitPrice": "19.0000",
        "UnitsInStock": "112",
        "CategoryName": "Seafood",
        "Supplier": "Svensk Sjöföda AB",
        "Discontinued": "false"
    },
    {
        "ProductID": "37",
        "ProductName": "Gravad lax",
        "UnitPrice": "26.0000",
        "UnitsInStock": "11",
        "CategoryName": "Seafood",
        "Supplier": "Svensk Sjöföda AB",
        "Discontinued": "false"
    },
    {
        "ProductID": "38",
        "ProductName": "Côte de Blaye",
        "UnitPrice": "263.5000",
        "UnitsInStock": "17",
        "CategoryName": "Beverages",
        "Supplier": "Aux joyeux ecclésiastiques",
        "Discontinued": "false"
    },
    {
        "ProductID": "39",
        "ProductName": "Chartreuse verte",
        "UnitPrice": "18.0000",
        "UnitsInStock": "69",
        "CategoryName": "Beverages",
        "Supplier": "Aux joyeux ecclésiastiques",
        "Discontinued": "false"
    },
    {
        "ProductID": "40",
        "ProductName": "Boston Crab Meat",
        "UnitPrice": "18.4000",
        "UnitsInStock": "123",
        "CategoryName": "Seafood",
        "Supplier": "New England Seafood Cannery",
        "Discontinued": "false"
    },
    {
        "ProductID": "41",
        "ProductName": "Jack's New England Clam Chowder",
        "UnitPrice": "9.6500",
        "UnitsInStock": "85",
        "CategoryName": "Seafood",
        "Supplier": "New England Seafood Cannery",
        "Discontinued": "false"
    },
    {
        "ProductID": "42",
        "ProductName": "Singaporean Hokkien Fried Mee",
        "UnitPrice": "14.0000",
        "UnitsInStock": "26",
        "CategoryName": "Grains",
        "Supplier": "Leka Trading",
        "Discontinued": "true"
    },
    {
        "ProductID": "43",
        "ProductName": "Ipoh Coffee",
        "UnitPrice": "46.0000",
        "UnitsInStock": "17",
        "CategoryName": "Beverages",
        "Supplier": "Leka Trading",
        "Discontinued": "false"
    },
    {
        "ProductID": "44",
        "ProductName": "Gula Malacca",
        "UnitPrice": "19.4500",
        "UnitsInStock": "27",
        "CategoryName": "Condiments",
        "Supplier": "Leka Trading",
        "Discontinued": "false"
    },
    {
        "ProductID": "45",
        "ProductName": "Rogede sild",
        "UnitPrice": "9.5000",
        "UnitsInStock": "5",
        "CategoryName": "Seafood",
        "Supplier": "Lyngbysild",
        "Discontinued": "false"
    },
    {
        "ProductID": "46",
        "ProductName": "Spegesild",
        "UnitPrice": "12.0000",
        "UnitsInStock": "95",
        "CategoryName": "Seafood",
        "Supplier": "Lyngbysild",
        "Discontinued": "false"
    },
    {
        "ProductID": "47",
        "ProductName": "Zaanse koeken",
        "UnitPrice": "9.5000",
        "UnitsInStock": "36",
        "CategoryName": "Confections",
        "Supplier": "Zaanse Snoepfabriek",
        "Discontinued": "false"
    },
    {
        "ProductID": "48",
        "ProductName": "Chocolade",
        "UnitPrice": "12.7500",
        "UnitsInStock": "15",
        "CategoryName": "Confections",
        "Supplier": "Zaanse Snoepfabriek",
        "Discontinued": "false"
    },
    {
        "ProductID": "49",
        "ProductName": "Maxilaku",
        "UnitPrice": "20.0000",
        "UnitsInStock": "10",
        "CategoryName": "Confections",
        "Supplier": "Karkki Oy",
        "Discontinued": "false"
    },
    {
        "ProductID": "50",
        "ProductName": "Valkoinen suklaa",
        "UnitPrice": "16.2500",
        "UnitsInStock": "65",
        "CategoryName": "Confections",
        "Supplier": "Karkki Oy",
        "Discontinued": "false"
    },
    {
        "ProductID": "51",
        "ProductName": "Manjimup Dried Apples",
        "UnitPrice": "53.0000",
        "UnitsInStock": "20",
        "CategoryName": "Produce",
        "Supplier": "G'day,Mate",
        "Discontinued": "false"
    },
    {
        "ProductID": "52",
        "ProductName": "Filo Mix",
        "UnitPrice": "7.0000",
        "UnitsInStock": "38",
        "CategoryName": "Grains",
        "Supplier": "G'day,Mate",
        "Discontinued": "false"
    },
    {
        "ProductID": "53",
        "ProductName": "Perth Pasties",
        "UnitPrice": "32.8000",
        "UnitsInStock": "0",
        "CategoryName": "Meats",
        "Supplier": "G'day,Mate",
        "Discontinued": "true"
    },
    {
        "ProductID": "54",
        "ProductName": "Tourtière",
        "UnitPrice": "7.4500",
        "UnitsInStock": "21",
        "CategoryName": "Meats",
        "Supplier": "Ma Maison",
        "Discontinued": "false"
    },
    {
        "ProductID": "55",
        "ProductName": "Pâté chinois",
        "UnitPrice": "24.0000",
        "UnitsInStock": "115",
        "CategoryName": "Meats",
        "Supplier": "Ma Maison",
        "Discontinued": "false"
    },
    {
        "ProductID": "56",
        "ProductName": "Gnocchi di nonna Alice",
        "UnitPrice": "38.0000",
        "UnitsInStock": "21",
        "CategoryName": "Grains",
        "Supplier": "Pasta Buttini s.r.l.",
        "Discontinued": "false"
    },
    {
        "ProductID": "57",
        "ProductName": "Ravioli Angelo",
        "UnitPrice": "19.5000",
        "UnitsInStock": "36",
        "CategoryName": "Grains",
        "Supplier": "Pasta Buttini s.r.l.",
        "Discontinued": "false"
    },
    {
        "ProductID": "58",
        "ProductName": "Escargots de Bourgogne",
        "UnitPrice": "13.2500",
        "UnitsInStock": "62",
        "CategoryName": "Seafood",
        "Supplier": "Escargots Nouveaux",
        "Discontinued": "false"
    },
    {
        "ProductID": "59",
        "ProductName": "Raclette Courdavault",
        "UnitPrice": "55.0000",
        "UnitsInStock": "79",
        "CategoryName": "Dairy Products",
        "Supplier": "Gai pâturage",
        "Discontinued": "false"
    },
    {
        "ProductID": "60",
        "ProductName": "Camembert Pierrot",
        "UnitPrice": "34.0000",
        "UnitsInStock": "19",
        "CategoryName": "Dairy Products",
        "Supplier": "Gai pâturage",
        "Discontinued": "false"
    },
    {
        "ProductID": "61",
        "ProductName": "Sirop d'érable",
        "UnitPrice": "28.5000",
        "UnitsInStock": "113",
        "CategoryName": "Condiments",
        "Supplier": "Forêts d'érables",
        "Discontinued": "false"
    },
    {
        "ProductID": "62",
        "ProductName": "Tarte au sucre",
        "UnitPrice": "49.3000",
        "UnitsInStock": "17",
        "CategoryName": "Confections",
        "Supplier": "Forêts d'érables",
        "Discontinued": "false"
    },
    {
        "ProductID": "63",
        "ProductName": "Vegie-spread",
        "UnitPrice": "43.9000",
        "UnitsInStock": "24",
        "CategoryName": "Condiments",
        "Supplier": "Pavlova,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "64",
        "ProductName": "Wimmers gute Semmelknödel",
        "UnitPrice": "33.2500",
        "UnitsInStock": "22",
        "CategoryName": "Grains",
        "Supplier": "Plutzer Lebensmittelgroßmärkte AG",
        "Discontinued": "false"
    },
    {
        "ProductID": "65",
        "ProductName": "Louisiana Fiery Hot Pepper Sauce",
        "UnitPrice": "21.0500",
        "UnitsInStock": "76",
        "CategoryName": "Condiments",
        "Supplier": "New Orleans Cajun Delights",
        "Discontinued": "false"
    },
    {
        "ProductID": "66",
        "ProductName": "Louisiana Hot Spiced Okra",
        "UnitPrice": "17.0000",
        "UnitsInStock": "4",
        "CategoryName": "Condiments",
        "Supplier": "New Orleans Cajun Delights",
        "Discontinued": "false"
    },
    {
        "ProductID": "67",
        "ProductName": "Laughing Lumberjack Lager",
        "UnitPrice": "14.0000",
        "UnitsInStock": "52",
        "CategoryName": "Beverages",
        "Supplier": "Bigfoot Breweries",
        "Discontinued": "false"
    },
    {
        "ProductID": "68",
        "ProductName": "Scottish Longbreads",
        "UnitPrice": "12.5000",
        "UnitsInStock": "6",
        "CategoryName": "Confections",
        "Supplier": "Specialty Biscuits,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "69",
        "ProductName": "Gudbrandsdalsost",
        "UnitPrice": "36.0000",
        "UnitsInStock": "26",
        "CategoryName": "Dairy Products",
        "Supplier": "Norske Meierier",
        "Discontinued": "false"
    },
    {
        "ProductID": "70",
        "ProductName": "Outback Lager",
        "UnitPrice": "15.0000",
        "UnitsInStock": "15",
        "CategoryName": "Beverages",
        "Supplier": "Pavlova,Ltd.",
        "Discontinued": "false"
    },
    {
        "ProductID": "71",
        "ProductName": "Flotemysost",
        "UnitPrice": "21.5000",
        "UnitsInStock": "26",
        "CategoryName": "Dairy Products",
        "Supplier": "Norske Meierier",
        "Discontinued": "false"
    },
    {
        "ProductID": "72",
        "ProductName": "Mozzarella di Giovanni",
        "UnitPrice": "34.8000",
        "UnitsInStock": "14",
        "CategoryName": "Dairy Products",
        "Supplier": "Formaggi Fortini s.r.l.",
        "Discontinued": "false"
    },
    {
        "ProductID": "73",
        "ProductName": "Röd Kaviar",
        "UnitPrice": "15.0000",
        "UnitsInStock": "101",
        "CategoryName": "Seafood",
        "Supplier": "Svensk Sjöföda AB",
        "Discontinued": "false"
    },
    {
        "ProductID": "74",
        "ProductName": "Longlife Tofu",
        "UnitPrice": "10.0000",
        "UnitsInStock": "4",
        "CategoryName": "Produce",
        "Supplier": "Tokyo Traders",
        "Discontinued": "false"
    },
    {
        "ProductID": "75",
        "ProductName": "Rhönbräu Klosterbier",
        "UnitPrice": "7.7500",
        "UnitsInStock": "125",
        "CategoryName": "Beverages",
        "Supplier": "Plutzer Lebensmittelgroßmärkte AG",
        "Discontinued": "false"
    },
    {
        "ProductID": "76",
        "ProductName": "Lakkalikööri",
        "UnitPrice": "18.0000",
        "UnitsInStock": "57",
        "CategoryName": "Beverages",
        "Supplier": "Karkki Oy",
        "Discontinued": "false"
    },
    {
        "ProductID": "77",
        "ProductName": "Original Frankfurter grüne Soße",
        "UnitPrice": "13.0000",
        "UnitsInStock": "32",
        "CategoryName": "Condiments",
        "Supplier": "Plutzer Lebensmittelgroßmärkte AG",
        "Discontinued": "false"
    }
];


function logOneProduct(product)
{
    console.log("Product ID: " + product.ProductID + 
                " Product Name:" + product.ProductName + 
                " Unit Price: " + product.UnitPrice);
}

function logArrayOfProducts(arr)
{
    for(let i=0; i < arr.length; i++)
    {
        logOneProduct(arr[i])
    }
}

function getMatchingProductById(id, data)
{
    let match = null;
    for(let i = 0; i < data.length; i++)
    {
        if (data[i].ProductID == id)
        {
            match = data[i];
            break;
        }
    }
    return match;
}

function getMatchingProductsByCategory(catID, data)
{
    let matches = [];
    for(let i = 0; i < data.length; i++)
    {
        if (data[i].CategoryName.toUpperCase() == catID.toUpperCase())
        {
            matches[matches.length] = data[i];
        }
    }
    return matches;
}


/* THIS CODE ALLOWS REQUESTS FOR THE ONLY PAGE */

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.html" );
})

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/public/" + "index.html" );
 })


 /* THIS CODE ALLOWS REQUESTS FOR THE API THROUGH */

 // GET CATEGORIES
 app.get('/api/categories', function (req, res) {
    console.log("Got a GET request for categories");
	
    let data = fs.readFileSync( __dirname + "/data/" + "categories.json", 'utf8');
    data = JSON.parse(data);
    
    //calls to JSON.parse and JSON.stringify not needed if debugging removed
    //console.log("Returned data is: ");
    //for(let i=0; i < data.length; i++)
    //    console.log(data.Category + " - " + data.Value);
    res.end( JSON.stringify(data) );
});

// GET ALL COURSES
app.get('/api/products', function (req, res) {
    console.log("Got a GET request for ALL products");
	
    let data = fs.readFileSync( __dirname + "/data/products.json", 'utf8');
    //console.log("DATA--> " + data);

    // strips off bad characters which seem to be in products.json
    data = data.toString();
    data = data.replace(/[^\x20-\x7E]/g, '');
    ///console.log("DATA--> " + data);

    data = JSON.parse(data);
	
    //calls to JSON.parse and JSON.stringify not needed if debugging removed
    //console.log("Returned data is: ");
    //logArrayOfProducts(data);
    res.end( JSON.stringify(data) );
});

// GET ONE PRODUCT BY ID
app.get('/api/products/:id', function (req, res) {
    let id = req.params.id;
    console.log("Got a GET request for product " + id);

    let data = fs.readFileSync( __dirname + "/data/products.json", 'utf8');
    //console.log("DATA--> " + data);

    // strips off bad characters which seem to be in products.json
    data = data.toString();
    data = data.replace(/[^\x20-\x7E]/g, '');
    ///console.log("DATA--> " + data);

    data = JSON.parse(data);

    // find course by id
    let match = getMatchingProductById(id, data)
    if (match == null)
	{
		res.status(404).send('Not Found');
		return;
	}

    console.log("Returned data is: ");
    logOneProduct(match);
    res.end( JSON.stringify(match) );
})

// GET MANY PRODUCTS BY CATEGORY
app.get('/api/products/bycategory/:id', function (req, res) {
    let id = req.params.id;
    console.log("Got a GET request for products in category " + id);                      

    let data = fs.readFileSync( __dirname + "/data/products.json", 'utf8');
    //console.log("DATA--> " + data);

    // strips off bad characters which seem to be in products.json
    data = data.toString();
    data = data.replace(/[^\x20-\x7E]/g, '');
    ///console.log("DATA--> " + data);

    data = JSON.parse(data);

    // find the matching products
    let matches = getMatchingProductsByCategory(id, data);

    //console.log("Returned data is: ");
    //logArrayOfProducts(matches);
    res.end( JSON.stringify(matches) );
})
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

let server = app.listen(8081, function () {
   //let host = server.address().address
   let port = server.address().port
   
   console.log("App listening at port %s", port)
})
