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
    required: [true, 'Please provide 3-5 images.'],
    validate: {
      validator: function (v) {
        return v && v.length >= 3 && v.length <= 5;
      },
      message: 'A project must have between 3 and 5 images.',
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
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
