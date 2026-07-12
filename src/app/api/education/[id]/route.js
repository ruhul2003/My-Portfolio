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

// PUT /api/education/[id] (Admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const entry = await Education.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!entry) {
      return NextResponse.json({ success: false, message: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: entry }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/education/[id] (Admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const entry = await Education.findByIdAndDelete(id);

    if (!entry) {
      return NextResponse.json({ success: false, message: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Entry deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
