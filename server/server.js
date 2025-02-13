
require('dotenv').config()


// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// const storeItems = new map([])
const express = require('express');
const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express();
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: authMiddleware
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.zb0q6b5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startApolloServer(typeDefs, resolvers);
