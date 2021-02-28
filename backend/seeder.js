const mongoose=require('mongoose');
const dotenv=require('dotenv');
const colors=require('colors');
const users=require('./data/user');
const products=require('./data/products');
const User=require('./models/userModel');
const Product=require('./models/productModel');
const Order=require('./models/orderModel');
const connectDB=require('./config/db');

dotenv.config();

connectDB();

const importData= async () =>{
    try {
        Order.deleteMany();
        Product.deleteMany();
        User.deleteMany();

      const createdUsers = await User.insertMany(users);

      const adminUser=createdUsers[0]._id

      const sampleProducts=products.map(product=>{
         return {...product,user:adminUser}
      })

      await Product.insertMany(sampleProducts);
      console.log('Data Imported!'.green.inverse);
      process.exit();
    } 
    catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData= async () =>{
    try {
        Order.deleteMany();
        Product.deleteMany();
        User.deleteMany();

      console.log('Data Destroyed!'.red.inverse);
      process.exit();
    } 
    catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] ==='-d'){
   destroyData()
}else{
    importData()
}