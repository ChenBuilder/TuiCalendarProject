import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import eventRoutes from './routes/event.js';


const mongoURI = 'mongodb://127.0.0.1:27017/calendar_db';

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
app.use(cors());
app.use(bodyParser.json());
app.use('/', eventRoutes);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

