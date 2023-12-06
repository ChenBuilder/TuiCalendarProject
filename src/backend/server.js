import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventRoutes from './routes/event.js';

// Determine if we are in a production environmentac
const isProduction = process.env.NODE_ENV === 'production';

// Use dotenv only in development
if (!isProduction) {
  import('dotenv/config').then((dotenv) => {
    dotenv.config();
  });
}
// Now, `process.env.MONGO_URI` will be populated either by dotenv in development or by Kubernetes in production
const mongoURI = process.env.MONGO_URI;
// const mongoURI = 'mongodb://mongodb:27017/calendar_db';
console.log("Mongo URI: ", process.env.MONGO_URI);

// Connect to the MongoDB database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// Listen for the MongoDB connection event
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
// Listen for the MongoDB connection error event
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
// Listen for the MongoDB disconnection event
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});
// Gracefully close the MongoDB connection when the Node.js process exits
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});


const app = express();

// CORS Configuration for Production
// const corsOptions = isProduction ? { origin: 'https://yourproductiondomain.com', optionsSuccessStatus: 200 } : {};

app.use(cors());
app.use(bodyParser.json());
app.use('/', eventRoutes);

// Start the Express server
const port = process.env.MONGO_PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});


/* 
Test for local to MongoDB Altas
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventRoutes from './routes/event.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDirectory = path.resolve(__dirname, '..');
dotenv.config({ path: `${parentDirectory}/.env` });

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://lc404:lc404@tuimongocluster.nxl9eie.mongodb.net/calendar_db?retryWrites=true&w=majority'
*/
