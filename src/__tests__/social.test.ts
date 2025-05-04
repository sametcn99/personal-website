import { socialMediaLinks } from "../lib/social";

describe("Social Media Links", () => {
  test("all types should be unique", () => {
    // Create a Set to store all types
    const allTypes = new Set<string>();
    // Create an array to store duplicate types if found
    const duplicates: { type: string; labels: string[] }[] = [];

    // Go through each social media link
    socialMediaLinks.forEach((link) => {
      link.type.forEach((type) => {
        // If the type is already in the Set, we found a duplicate
        if (allTypes.has(type)) {
          // Find which other social media links have this type
          const linksWithType = socialMediaLinks
            .filter((otherLink) => otherLink.type.includes(type))
            .map((link) => link.label);

          duplicates.push({
            type,
            labels: linksWithType,
          });
        } else {
          // Add the type to our Set if it's not a duplicate
          allTypes.add(type);
        }
      });
    });

    // If we found any duplicates, fail the test with a detailed message
    if (duplicates.length > 0) {
      const duplicateMessages = duplicates.map(
        ({ type, labels }) =>
          `Type "${type}" is used in multiple links: ${labels.join(", ")}`,
      );

      throw new Error(
        "Found duplicate types:\n" + duplicateMessages.join("\n"),
      );
    }
  });
});
