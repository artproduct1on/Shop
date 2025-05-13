require('dotenv').config()

const express = require('express');
const categories = require('./routes/categories');
const sale = require('./routes/sale');
const order = require('./routes/order');
const products = require('./routes/products');
const sequelize = require('./database/database');
const cors = require('cors')
const Category = require('./database/models/category');
const Product = require('./database/models/product');
const PORT = process.env.PORT || 5000;

Category.hasMany(Product);

const app = express();
app.use(express.static('public'))
    .use(cors({ origin: '*' }))
    .use(express.urlencoded())
    .use('/categories', categories)
    .use('/products', products)
    .use('/sale', sale)
    .use('/order', order)
    .use(express.json());

const start = async () => {
    try {
        await sequelize.sync().then(
            result => {/*console.log(result) */ },
            err => console.log(err)
        );

        app.listen(PORT, () => {
            console.log(`\n\nServer started on ${PORT} port...`)
        })
    } catch (err) {
        console.log(err);
    }
}
start();
