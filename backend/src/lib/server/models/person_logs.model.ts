import mongoose from 'mongoose';
const { Schema } = mongoose;

const PersonLogSchema = new Schema({
  ref_id: { type: Schema.Types.ObjectId, required: true },
  data: { type: Object, required: true },
  action: { type: String, required: true },
  action_at: { type: Date, default: Date.now }
});

export default mongoose.models.person_logs || mongoose.model('person_logs', PersonLogSchema);
