import mongoose from 'mongoose';
const { Schema } = mongoose;

const PersonSchema = new Schema(
  {
    personal_id_number: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.persons || mongoose.model('persons', PersonSchema);
