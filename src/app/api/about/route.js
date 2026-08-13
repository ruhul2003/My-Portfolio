import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import About from '@/models/About';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-ruhul-portfolio';

// Helper to check if user is admin
function isAdmin(request) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded && decoded.role === 'admin';
  } catch (e) {
    return false;
  }
}

const defaultAboutData = {
  shortIntro: "With over 2 years of dedicated focus on developing web applications that achieve business goals, I have established myself as a trusted professional in the industry.",
  stats: [
    { number: "3+", label: "Years of Experience" },
    { number: "50+", label: "Complete Projects" }
  ],
  bioHeadingPrefix: "A Passionate",
  bioHeadingHighlight: "Web Designer",
  bioHeadingSuffix: "Turning Ideas Into Visually Stunning, User-Friendly Websites.",
  bioParagraphs: [
    "Hi, I’m Ruhul Amin — a passionate Web Developer and Web Designer with around two years of hands-on experience building modern, user-friendly digital experiences. I specialize in full-stack development, focusing on creating responsive interfaces and scalable web applications.",
    "Currently, I’m continuously improving my skills by working on real-world projects and exploring new technologies. I enjoy turning ideas into functional products and aim to build impactful solutions."
  ],
  principles: [
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
};

import Project from '@/models/Project';

// GET About data
export async function GET() {
  try {
    await dbConnect();
    let aboutData = await About.findOne({});

    if (!aboutData) {
      aboutData = await About.create(defaultAboutData);
    } else if (aboutData.stats && aboutData.stats.some(s => /client satisfied|cup.*coffee/i.test(s.label))) {
      aboutData.stats = aboutData.stats.filter(s => !/client satisfied|cup.*coffee/i.test(s.label));
      await aboutData.save();
    }

    const plainAbout = aboutData.toObject();
    const projectCount = await Project.countDocuments({});

    return NextResponse.json({
      success: true,
      data: {
        ...plainAbout,
        totalProjectsInDb: projectCount
      }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT / Update About data (Admin only)
export async function PUT(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    let aboutData = await About.findOne({});
    if (aboutData) {
      aboutData.shortIntro = body.shortIntro ?? aboutData.shortIntro;
      aboutData.stats = body.stats ?? aboutData.stats;
      aboutData.bioHeadingPrefix = body.bioHeadingPrefix ?? aboutData.bioHeadingPrefix;
      aboutData.bioHeadingHighlight = body.bioHeadingHighlight ?? aboutData.bioHeadingHighlight;
      aboutData.bioHeadingSuffix = body.bioHeadingSuffix ?? aboutData.bioHeadingSuffix;
      aboutData.bioParagraphs = body.bioParagraphs ?? aboutData.bioParagraphs;
      aboutData.principles = body.principles ?? aboutData.principles;
      aboutData.updatedAt = new Date();
      await aboutData.save();
    } else {
      aboutData = await About.create(body);
    }

    return NextResponse.json({ success: true, data: aboutData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
