import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Certification from '@/models/Certification';
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

const defaultCertifications = [
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Coursera / Meta",
    year: "2024",
    link: "https://coursera.org/verify/meta-frontend",
    type: "certification",
    description: "Deep dive into React, Javascript, front-end architecture, user experience design, and version control.",
    order: 1
  },
  {
    title: "Outstanding Web Development Contribution Award",
    issuer: "BloomHub Tech Annual Gala",
    year: "2023",
    link: "",
    type: "award",
    description: "Honored for driving the rewrite of critical client applications and optimizing loading speeds by 45%.",
    order: 2
  },
  {
    title: "MERN Stack Web Development Certification",
    issuer: "Programming Hero",
    year: "2022",
    link: "",
    type: "certification",
    description: "Comprehensive training in MongoDB, Express.js, React, Node.js, routing, security, and cloud deployment.",
    order: 3
  }
];

// GET all certifications and awards
export async function GET() {
  try {
    await dbConnect();
    let entries = await Certification.find({}).sort({ order: 1, createdAt: -1 });

    // Seed if empty
    if (entries.length === 0) {
      await Certification.insertMany(defaultCertifications);
      entries = await Certification.find({}).sort({ order: 1, createdAt: -1 });
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
    const entry = await Certification.create(body);

    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
