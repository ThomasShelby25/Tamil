import { NextRequest, NextResponse } from "next/server";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "default-dev-key-change-in-production";

export const validateAdminAuth = (request: NextRequest): boolean => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token === ADMIN_API_KEY;
};

export const adminAuthResponse = () => {
  return NextResponse.json(
    { error: "Unauthorized: Invalid or missing admin API key" },
    { status: 401 }
  );
};

export const validateAdminRequest = (request: NextRequest) => {
  if (!validateAdminAuth(request)) {
    return adminAuthResponse();
  }
  return null;
};
