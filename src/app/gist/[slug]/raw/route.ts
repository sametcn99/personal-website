import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  // Ensure the slug is a safe filename component
  if (!/^[a-zA-Z0-9-_]+$/.test(slug)) {
    return new NextResponse("Invalid slug", { status: 400 });
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "gists",
    `${slug}.mdx`,
  );

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
