import mongoose from 'mongoose';

const mongoUri: string = process.env.MONGODB_URI || 'mongodb://localhost/restrant';

mongoose.connect(mongoUri);

export default mongoose.connection;
