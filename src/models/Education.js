import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Please provide a year range (e.g. 2020 - PRESENT).'],
  },
  company: {
    type: String,
    required: [true, 'Please provide a company or institution name.'],
  },
  role: {
    type: String,
    required: [true, 'Please provide a role or degree name.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);
