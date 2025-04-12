const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const multer = require('multer');
const path = require('path');




require("dotenv").config();

//models

const Login = require("./models/Login");
const ShopData = require("./models/ShopData")
const Customers = require("./models/Customers")
const ProductCategories = require("./models/ProductCategories")
const Products = require("./models/Products")
const Sites = require("./models/Sites")
const Favourites = require("./models/Favourites")



const app = express();
const port = process.env.PORT || 5000;










// Middleware
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/static'); // Folder static
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
  }
});

const upload = multer({ storage: storage });


app.use(express.static('public'));


// MongoDB połączenie
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/login", async (req, res) => {
  try {
    const logins = await Login.find();
    res.json(logins);
    
  } catch (err) {
    res.status(400).send("Error fetching admin logins");
  }
});

app.put("/login/:id", async (req, res) => {
  try {
    const updatedLogin = await Login.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { login: req.body.login, password: req.body.password, permission: req.body.permission },  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedLogin);
  } catch (err) {
    res.status(400).send("Error updating login admin");
  }
});



app.get("/shopdata", async (req, res) => {
  try {
    const shopdata = await ShopData.find();
    res.json(shopdata);
    
  } catch (err) {
    res.status(400).send("Error fetching shop data");
  }
});



app.put("/shopdata/:id", async (req, res) => {
  try {
    const updatedShopData = await ShopData.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { shoptitle: req.body.shoptitle, companyname: req.body.companyname, companystreet: req.body.companystreet, companypostcode: req.body.companypostcode, companycity: req.body.companycity, companynip: req.body.companynip, companyemail: req.body.companyemail, companyphonenumber: req.body.companyphonenumber },  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedShopData);
  } catch (err) {
    res.status(400).send("Error updating shop data");
  }
});



app.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.find();
    res.json(customers);
    
  } catch (err) {
    res.status(400).send("Error fetching customers");
  }
});

app.post('/customers', async (req, res) => {
  const newCustomers = new Customers({
    name: req.body.name,
    surname: req.body.surname,
    street: req.body.street,
    postcode: req.body.postcode,
    city: req.body.city,
    companyname: req.body.companyname, 
    companystreet: req.body.companystreet,
    companypostcode: req.body.companypostcode,
    companycity: req.body.companycity,
    email: req.body.email,
    invoice: req.body.invoice,
    login: req.body.login,
    newsletter: req.body.newsletter,
    password: req.body.password,
    phonenumber: req.body.phonenumber,
    regulations: req.body.regulations,
    companynip: req.body.companynip,
    companyregon: req.body.companyregon,
  })
  try {
    await newCustomers.save();
    res.status(201).json(newCustomers);
  } catch (err) {
    res.status(400).send("Error adding customer");
  }
})

app.delete("/customers/:id", async (req, res) => {
  try {
    const customers = await Customers.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted", customers });
  } catch (err) {
    res.status(400).send("Error deleting customer");
  }
});


app.get("/productcategories", async (req, res) => {
  try {
    const productcategories = await ProductCategories.find();
    res.json(productcategories);
    
  } catch (err) {
    res.status(400).send("Error fetching product categories");
  }
});



app.delete("/productcategories/:id", async (req, res) => {
  try {
    const productcategories = await ProductCategories.findByIdAndDelete(req.params.id);
    res.json({ message: "Product category deleted", productcategories });
  } catch (err) {
    res.status(400).send("Error deleting product category");
  }
});



app.post('/productcategories', async (req, res) => {
  const newProductCategories = new ProductCategories({
    name: req.body.name, 
  })
  try {
    await newProductCategories.save();
    res.status(201).json(newProductCategories);
  } catch (err) {
    res.status(400).send("Error adding product categories");
  }
})


app.put("/productcategories/:id", async (req, res) => {
  try {
    const updatedProductCategory = await ProductCategories.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { name: req.body.name},  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedProductCategory);
  } catch (err) {
    res.status(400).send("Error updating product category");
  }
});



app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Zwracamy pełną ścieżkę do pliku
  res.json({ imageUrl: `/static/${req.file.filename}` });
});

app.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
    
  } catch (err) {
    res.status(400).send("Error fetching products");
  }
});


app.post('/products', async (req, res) => {
  const newProducts = new Products({
    productname: req.body.productname,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    imageurl: req.body.imageurl,
    storepieces: req.body.storepieces
    
  })
  try {
    await newProducts.save();
    res.status(201).json(newProducts);
  } catch (err) {
    res.status(400).send("Error adding product");
  }
})


app.delete("/products/:id", async (req, res) => {
  try {
    const products = await Products.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted", products });
  } catch (err) {
    res.status(400).send("Error deleting product");
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { productname: req.body.productname, price: req.body.price, description: req.body.description, category: req.body.category, imageurl: req.body.imageurl, storepieces: req.body.storepieces},  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).send("Error updating product");
  }
});

app.get("/sites", async (req, res) => {
  try {
    const sites = await Sites.find();
    res.json(sites);
    
  } catch (err) {
    res.status(400).send("Error fetching sites");
  }
});

app.delete("/sites/:id", async (req, res) => {
  try {
    const sites = await Sites.findByIdAndDelete(req.params.id);
    res.json({ message: "Site deleted", sites });
  } catch (err) {
    res.status(400).send("Error deleting site");
  }
});


app.post('/sites', async (req, res) => {
  const newSites = new Sites({
    name: req.body.name,
    content: req.body.content,
    url: req.body.url
  })
  try {
    await newSites.save();
    res.status(201).json(newSites);
  } catch (err) {
    res.status(400).send("Error adding site");
  }
})


app.put("/sites/:id", async (req, res) => {
  try {
    const updatedSite = await Sites.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { name: req.body.name, content: req.body.content, url: req.body.url},  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedSite);
  } catch (err) {
    res.status(400).send("Error updating site");
  }
});

app.get("/favourites", async (req, res) => {
  try {
    const favourites = await Favourites.find();
    res.json(favourites);
    
  } catch (err) {
    res.status(400).send("Error fetching favourites");
  }
});

app.post('/favourites', async (req, res) => {
  const newFavourites = new Favourites({
    user: req.body.user,
    favourites: req.body.favourites
    
  })
  try {
    await newFavourites.save();
    res.status(201).json(newFavourites);
  } catch (err) {
    res.status(400).send("Error adding favourites");
  }
})


app.put("/favourites/:id", async (req, res) => {
  try {
    const updatedFavourites = await Favourites.findByIdAndUpdate(
      req.params.id,  // Znajdź element po ID
      { user: req.body.user, favourites: req.body.favourites},  // Zaktualizuj dane
      { new: true }  // Zwróć zaktualizowany obiekt
    );
    res.json(updatedFavourites);
  } catch (err) {
    res.status(400).send("Error updating favourites");
  }
});


// Uruchamiamy serwer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
