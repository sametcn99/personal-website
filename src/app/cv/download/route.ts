import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const filename = "samet-can-cincik-cv.pdf";
  const filePath = path.join(process.cwd(), "public", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
