const taskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    title: String,
    description: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    completedAt: Date
  });
  
  export default mongoose.model('Task', taskSchema);