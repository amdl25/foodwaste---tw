import express from 'express';
import env from 'dotenv';
import DB_Init from './entities/DB_init.js'
import createDbRouter from './routes/createDBRoute.js';
import userRouter from './routes/UserRoutes.js';
import productRouter from './routes/ProductRoutes.js';
import grupRouter from './routes/GrupRoutes.js';
import friendshipRouter from './routes/FriendshipRoutes.js';
import friendshipRequestRouter from './routes/FriendshipRequestRoutes.js';


env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

DB_Init();

app.use("/api", createDbRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api",grupRouter);
app.use("/api",friendshipRouter);
app.use("/api", friendshipRequestRouter);

let port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);
