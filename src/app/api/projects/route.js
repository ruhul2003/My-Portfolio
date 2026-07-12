import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
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

const defaultProjects = [
  {
    title: "Tilux",
    description: "Tilux is a modern marble and tiles showcase web application built with Next.js",
    link: "https://tilux.vercel.app",
    images: [
      { url: "/assets/p5.png", title: "Landing Page" },
      { url: "/assets/p5.png", title: "Product Categories" },
      { url: "/assets/p5.png", title: "Interactive Product Showcase" }
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
  },
  {
    title: "Keen Keeper",
    description: "A brief description of this amazing project and what I delivered.",
    link: "https://keen-keeper-tau-rosy.vercel.app",
    images: [
      { url: "/assets/p1.png", title: "Task Dashboard" },
      { url: "/assets/p1.png", title: "Sprint View" },
      { url: "/assets/p1.png", title: "Collaborators Panel" }
    ],
    technologies: ["React", "Vite", "Tailwind CSS"],
  },
  {
    title: "DigiTools",
    description: "Another standout project showcasing modern design and functionality.",
    link: "https://digi-tools-platform-git-ruhul-ruhul-amin1.vercel.app",
    images: [
      { url: "/assets/p2.png", title: "Product Catalog" },
      { url: "/assets/p2.png", title: "Shopping Cart" },
      { url: "/assets/p2.png", title: "Stripe Checkout" }
    ],
    technologies: ["React", "Tailwind CSS", "Node.js"],
  },
  {
    title: "English Janala",
    description: "High-quality solution delivered to a client with great results.",
    link: "https://english-janala.vercel.app",
    images: [
      { url: "/assets/p3.png", title: "Online Portal Homepage" },
      { url: "/assets/p3.png", title: "Course Content Grid" },
      { url: "/assets/p3.png", title: "Student Progress Tracker" }
    ],
    technologies: ["React", "Tailwind CSS", "Express"],
  },
  {
    title: "Github Issue Tracker",
    description: "Community-focused project that I'm really proud of.",
    link: "https://github-issues-tracker-plum.vercel.app",
    images: [
      { url: "/assets/p4.png", title: "Active Issues Dashboard" },
      { url: "/assets/p4.png", title: "Issue Filter Grid" },
      { url: "/assets/p4.png", title: "New Issue Submission Form" }
    ],
    technologies: ["React", "Tailwind CSS", "Vite"],
  },
];

import SystemSetting from '@/models/SystemSetting';

// GET all projects
export async function GET() {
  try {
    await dbConnect();
    let projects = await Project.find({}).sort({ createdAt: -1 });
    
    // Self-healing check: Convert old string array format to object format
    if (projects.length > 0 && projects[0].images && projects[0].images[0] && typeof projects[0].images[0] === 'string') {
      await Project.deleteMany({});
      await SystemSetting.deleteOne({ key: 'seeded_projects' });
      projects = [];
    }

    // Seed default projects if never seeded before
    const hasSeeded = await SystemSetting.findOne({ key: 'seeded_projects' });
    if (projects.length === 0 && !hasSeeded) {
      await Project.insertMany(defaultProjects);
      await SystemSetting.create({ key: 'seeded_projects', value: 'true' });
      projects = await Project.find({}).sort({ createdAt: -1 });
    } else if (projects.length > 0 && !hasSeeded) {
      await SystemSetting.create({ key: 'seeded_projects', value: 'true' });
    }
    
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST new project (Admin only)
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    // Server-side validation of image count
    if (!body.images || body.images.length < 3 || body.images.length > 5) {
      return NextResponse.json({ success: false, message: 'You must provide between 3 and 5 images.' }, { status: 400 });
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
