import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
});

const PrincipleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

const AboutSchema = new mongoose.Schema({
  shortIntro: {
    type: String,
    required: true,
    default: "With over 2 years of dedicated focus on developing web applications that achieve business goals, I have established myself as a trusted professional in the industry."
  },
  stats: {
    type: [StatSchema],
    default: [
      { number: "3+", label: "Years of Experience" },
      { number: "50+", label: "Complete Projects" }
    ]
  },
  bioHeadingPrefix: {
    type: String,
    default: "A Passionate"
  },
  bioHeadingHighlight: {
    type: String,
    default: "Web Designer"
  },
  bioHeadingSuffix: {
    type: String,
    default: "Turning Ideas Into Visually Stunning, User-Friendly Websites."
  },
  bioParagraphs: {
    type: [String],
    default: [
      "Hi, I’m Ruhul Amin — a passionate Web Developer and Web Designer with around two years of hands-on experience building modern, user-friendly digital experiences. I specialize in full-stack development, focusing on creating responsive interfaces and scalable web applications.",
      "Currently, I’m continuously improving my skills by working on real-world projects and exploring new technologies. I enjoy turning ideas into functional products and aim to build impactful solutions."
    ]
  },
  principles: {
    type: [PrincipleSchema],
    default: [
      {
        title: "Performance First",
        desc: "Optimizing asset sizes, caching requests, and rendering with fast layouts to deliver instant responsiveness."
      },
      {
        title: "Clean Architecture",
        desc: "Writing modular, scalable, and highly maintainable components that adapt to changing business needs."
      },
      {
        title: "User Centric Design",
        desc: "Crafting interfaces that are accessible, interactive, and naturally intuitive for every visitor."
      }
    ]
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);
