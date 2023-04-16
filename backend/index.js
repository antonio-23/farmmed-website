import express from 'express';
const app = express()
import userRoutes from './routes/users.js'
import orderRoutes from './routes/order.js'
import order_drugRoutes from './routes/order_drug.js'
import medical_fileRoutes from './routes/medical_file.js'
import drugRoutes from './routes/drug.js'
import authRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(cookieParser())
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Update to string value
  next();
})


app.use("/api/users", userRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/order_drug", order_drugRoutes)
app.use("/api/medical_file", medical_fileRoutes)
app.use("/api/drug", drugRoutes)
app.use("/api/auth", authRoutes)

app.listen(8800, () => {
    console.log("BACKEND working!");
}); 
