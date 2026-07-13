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

import SystemSetting from '@/models/SystemSetting';

// GET all projects
export async function GET() {
  try {
    await dbConnect();
    
    // Clean up previously seeded projects if hasSeeded flag is present
    const hasSeeded = await SystemSetting.findOne({ key: 'seeded_projects' });
    if (hasSeeded) {
      await Project.deleteMany({
        title: { $in: ["Tilux", "Keen Keeper", "DigiTools", "English Janala", "Github Issue Tracker"] }
      });
      await SystemSetting.deleteOne({ key: 'seeded_projects' });
    }

    const projects = await Project.find({}).sort({ createdAt: -1 });
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
    if (!body.images || body.images.length < 1) {
      return NextResponse.json({ success: false, message: 'You must provide at least 1 image.' }, { status: 400 });
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
