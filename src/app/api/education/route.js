import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Education from '@/models/Education';
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

const defaultEducation = [
  {
    year: "2020 - PRESENT",
    company: "BloomHub Technology",
    role: "Application Developer",
    description: "As a product designer at a leading e-commerce company, I was responsible for designing user interfaces for the company's online shopping platform. I collaborated closely with marketing and development teams to create designs that improved user experience and increased sales.",
    order: 1
  },
  {
    year: "2018 - 2020",
    company: "Skyward Company Limited",
    role: "Products Designer",
    description: "Worked as a product designer in a startup environment, focusing on mobile app UI/UX. Created wireframes, designed interfaces, and conducted user testing to ensure a smooth experience.",
    order: 2
  },
  {
    year: "2012 - 2018",
    company: "Atlas Innovations",
    role: "Senior Developer",
    description: "Worked with multiple clients across industries, building user interfaces and digital products. Focused on adaptability, clean design, and delivering efficient solutions.",
    order: 3
  }
];

// GET all education entries
export async function GET() {
  try {
    await dbConnect();
    let entries = await Education.find({}).sort({ order: 1, createdAt: -1 });

    // Seed if empty
    if (entries.length === 0) {
      await Education.insertMany(defaultEducation);
      entries = await Education.find({}).sort({ order: 1, createdAt: -1 });
    }

    return NextResponse.json({ success: true, data: entries }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST new entry (Admin only)
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const entry = await Education.create(body);

    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
