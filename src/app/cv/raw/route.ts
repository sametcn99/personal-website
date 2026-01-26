import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "src", "app", "cv", "page.mdx");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(fileContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
