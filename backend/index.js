import express from 'express';
const app = express()
import userRoutes from './routes/user.js'
import orderRoutes from './routes/order.js'
import medical_fileRoutes from './routes/medical_file.js'
import drugRoutes from './routes/drug.js'
import authRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import usersRoutes from './routes/users.js'
import scheduleRoutes from './routes/schedule.js'
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


app.use("/api/users", usersRoutes)
app.use("/api/user", userRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/medical_file", medical_fileRoutes)
app.use("/api/drug", drugRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/schedule", scheduleRoutes)

app.listen(8800, () => {
    console.log("BACKEND working!");
}); 
