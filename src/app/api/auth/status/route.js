import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-ruhul-portfolio';

export async function GET(request) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded && decoded.role === 'admin') {
        return NextResponse.json({ authenticated: true, email: decoded.email }, { status: 200 });
      }
    } catch (err) {
      // Invalid token
    }

    return NextResponse.json({ authenticated: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false, message: error.message }, { status: 500 });
  }
}
