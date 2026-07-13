import mongoose from 'mongoose';

const ProjectImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Please provide an image url/base64.'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a description/title for this screenshot.'],
  },
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  link: {
    type: String,
    default: '',
  },
  images: {
    type: [ProjectImageSchema],
    required: [true, 'Please provide at least 1 image.'],
    validate: {
      validator: function (v) {
        return v && v.length >= 1;
      },
      message: 'A project must have at least 1 image.',
    },
  },
  technologies: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'projects' });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
