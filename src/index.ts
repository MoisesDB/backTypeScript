import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose"
import router from "../src/router";

const app = express()

app.use(cors({
    credentials: true,
}));
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app);

server.listen(8081, () => {
    console.log('server running on http://localhost:8081/')
})

const MONGO_URL = 'mongodb+srv://moisesdalbosco:bah@learningmongodb.wf3ho.mongodb.net/?retryWrites=true&w=majority&appName=LearningMongoDB';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router());