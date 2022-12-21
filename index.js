const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1ivadd4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbConnect = async () => {
    try {
      await client.connect();
      console.log("Database connected");
    } catch (error) {
      console.log(error);
    }
  };
  
dbConnect();

const productDetails = client.db(`${process.env.DB_USERNAME}`).collection('productDetails')

app.get('/productDetails', async (req, res) => {
    try {
        const query = {}
        const result = await productDetails.find(query).toArray()
        res.send(result)

    }
    catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`server is running on port`);
  });