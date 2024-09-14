import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Place document
export interface IPlace extends Document {
    name: string;
    pic: string;
    cuisines: string;
    city: string;
    state: string;
    founded: number;
    comments: mongoose.Types.ObjectId[];
    showEstablished: () => string;
}

// Define the schema for the Place model
const placeSchema: Schema<IPlace> = new Schema({
    name: { type: String, required: true },
    pic: { type: String, default: 'https://picsum.photos/350/350' },
    cuisines: { type: String, required: true },
    city: { type: String, default: 'Anytown' },
    state: { type: String, default: 'USA' },
    founded: {
        type: Number,
        min: [1673, 'Surely not that old?!'],
        max: [new Date().getFullYear(), 'This is the future!'],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// Add method to the schema
placeSchema.methods.showEstablished = function (): string {
    return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`;
};

// Create the Place model from the schema
const Place: Model<IPlace> = mongoose.model<IPlace>('Place', placeSchema);

// Export the Place model
export default Place;
