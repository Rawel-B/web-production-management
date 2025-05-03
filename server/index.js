import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Data
import {
  dataStocks,
  dataProducts,
  dataUsers,
  dataSales,
} from "./data/index.js";

// Models
import Stock from "./models/Stock.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Sales from "./models/Sales.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
};
app.use(express.json());

app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/sales", salesRoutes);
app.use("/stocks", stockRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);

// MONGOOSE SETUP
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000, // 5 second timeout
  socketTimeoutMS: 45000, // 45 second socket timeout
  maxPoolSize: 10, // Limit connection pool size
  retryWrites: true,
  retryReads: true
};
const PORT = process.env.PORT || 27017;
process.env.MONGO_URL = "mongodb://127.0.0.1:27017/production"

mongoose.connect(process.env.MONGO_URL).then(async () => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
      try {
        //====> Reset Records & Do Not Delete Important Data Like Tickets
        await Promise.all([
          Stock.deleteMany({}),
          User.deleteMany({}),
          Product.deleteMany({}),
          Sales.deleteMany({}),
        ]);

        // const hashedUsers = await Promise.all(
        //   dataUsers.map(async (user) => {
        //     const salt = await bcrypt.genSalt(10);
        //     const hashedPassword = await bcrypt.hash(user.password, salt);
        //     return { ...user, password: hashedPassword };
        //   })
        // );
        const TASK_TYPES = {
          INVENTORY_CHECK: "Inventory Check",
          ORDER_FULFILLMENT: "Order Fulfillment",
          STOCK_RECEIVING: "Stock Receiving",
          QUALITY_CHECK: "Quality Check",
          CLEANING: "Cleaning",
          MAINTENANCE: "Equipment Maintenance"
        };
        const taskTypeValues = Object.values(TASK_TYPES);

        const hashedUsers = await Promise.all(
          dataUsers.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            
            const userWithTasks = { ...user, password: hashedPassword };
            
            if (user.role === 'worker') {
              const taskCount = Math.floor(Math.random() * 3) + 1;
              userWithTasks.tasks = [];
              
              for (let i = 0; i < taskCount; i++) {
                const randomTaskKey = taskTypeValues[Math.floor(Math.random() * taskTypeValues.length)];
                if (!userWithTasks.tasks.includes(randomTaskKey)) {
                  userWithTasks.tasks.push(randomTaskKey);
                }
              }
            }
            
            return userWithTasks;
          })
        );
    

        //====> Fill Database Records
        const [userResult, stockResult] = await Promise.all([
          User.insertMany(hashedUsers),
          Stock.insertMany(dataStocks),
        ]);

        const stockMap = {};
        stockResult.forEach(stock => {
          stockMap[stock.number] = stock._id;
        });
        
        const updatedProducts = dataProducts.map(product => {
          const updatedComponents = product.components.map(component => {
            const refId = stockMap[component.stockItem];
            if (!refId) {
              throw new Error(`Stock number ${component.stockItem} not found in inserted stocks`);
            }
            return { ...component, stockRef: refId };
          });
          return { ...product, components: updatedComponents };
        });

        //====> Fill Database Records After Update (Linked Stocks To Products)
        const [productResult, salesResult] = await Promise.all([
          Product.insertMany(updatedProducts),
          Sales.insertMany(dataSales),
        ]);

        //====> Sales
        let salesInserted = 0;
        try {
          const products = await Product.find();
          console.log("Products Found :", products.length);

          for (const product of products) {
            if (!product._id) {
              console.error(`Product ${product.name} is missing _id`);
              continue;
            }
          
            const salesCount = Math.floor(Math.random() * 10) + 5;
            for (let i = 0; i < salesCount; i++) {
              const quantitySold = Math.floor(Math.random() * 5) + 1;             
              const randomDate = new Date(
                Date.now() - Math.floor(Math.random() * (1000 * 60 * 60 * 24 * 365 * 2)) // 2 years range
              );
              const sale = new Sales({
                productName: product.name,
                productId: product._id,
                price: product.price,
                quantity: quantitySold,
                saleDate: randomDate,
              });

              await sale.save();
              salesInserted++; 
            }
          }
      
          console.log("Sales data generated successfully!");
        } catch (error) {
          console.error("Error generating sales data:", error);
        }

        const totalInserted = userResult.length + stockResult.length + productResult.length + salesResult.length + salesInserted;

        console.log(`${totalInserted} data records inserted successfully`);
    } catch (insertError) {
      console.error("Error inserting data:", insertError);
    }
  }).catch((error) => {
    console.log(error.message);
  });
