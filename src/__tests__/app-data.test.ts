import fs from "fs";
import path from "path";
import appData from "../lib/app-data.json"; // Adjust the path as necessary

describe("App Data Validation", () => {
  it("should ensure all gist directories exist in app-data.json", () => {
    const gistDirPath = path.resolve(__dirname, "../../src/app/gist"); // Go up two levels from __tests__ to the root, then down to src/app/gist
    const gistDirs = fs
      .readdirSync(gistDirPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Extract slugs from the href property in the appData array
    const appDataGistSlugs = (appData as AppDataItem[])
      .filter((item) => item.href.startsWith("/gist/")) // Ensure we only process gist links
      .map((item) => item.href.split("/").pop() || ""); // Extract the last part of the href as the slug

    // Check if every directory name is present as a slug in app-data.json
    gistDirs.forEach((dirName) => {
      expect(appDataGistSlugs).toContain(dirName);
    });

    // Optional: Check if every slug in app-data.json corresponds to an existing directory
    appDataGistSlugs.forEach((slug) => {
      expect(gistDirs).toContain(slug);
    });
  });
});
