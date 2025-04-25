
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
});

export default mongoose.model('Project', projectSchema);


