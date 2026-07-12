import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = 'ruhul941020@gmail.com';
const ADMIN_PASSWORD = 'ruhuls12';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-ruhul-portfolio';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create JWT token
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Create response
      const response = NextResponse.json(
        { success: true, message: 'Logged in successfully' },
        { status: 200 }
      );

      // Set cookie
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
