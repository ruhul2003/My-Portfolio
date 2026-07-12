import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title.'],
  },
  issuer: {
    type: String,
    required: [true, 'Please provide an issuer name.'],
  },
  year: {
    type: String,
    required: [true, 'Please provide a year.'],
  },
  link: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['certification', 'award'],
    required: [true, 'Please select a type (certification or award).'],
    default: 'certification',
  },
  description: {
    type: String,
    default: '',
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

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
