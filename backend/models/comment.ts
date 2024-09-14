import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Comment document
export interface IComment extends Document {
    author: string;
    rant: boolean;
    stars: number;
    content: string;
}

// Define the schema for the Comment model
const commentSchema: Schema<IComment> = new Schema({
    author: { type: String, default: 'Anonymous' },
    rant: { type: Boolean, default: false },
    stars: { type: Number, required: true },
    content: { type: String, default: '' },
});

// Create the Comment model from the schema
const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);

// Export the Comment model
export default Comment;
