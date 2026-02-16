import { type NextRequest, NextResponse } from "next/server";

const DEFAULT_ICON_PATH = "/globe.svg";
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

/**
 * Checks whether a hostname points to a local or private network target.
 */
function isLocalOrPrivateHost(hostname: string) {
  const normalizedHostname = hostname.toLowerCase();

  if (
    normalizedHostname === "localhost" ||
    normalizedHostname.endsWith(".local") ||
    normalizedHostname === "127.0.0.1" ||
    normalizedHostname === "0.0.0.0" ||
    normalizedHostname === "::1"
  ) {
    return true;
  }

  if (/^10\./.test(normalizedHostname)) {
    return true;
  }

  if (/^192\.168\./.test(normalizedHostname)) {
    return true;
  }

  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(normalizedHostname)) {
    return true;
  }

  return false;
}

/**
 * Validates a favicon URL and returns a normalized URL when allowed.
 */
function getValidatedTargetUrl(rawUrl: string | null) {
  if (!rawUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(rawUrl);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return null;
    }

    if (isLocalOrPrivateHost(parsedUrl.hostname)) {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

/**
 * Returns candidate favicon sources for a target URL.
 */
function getCandidateUrls(targetUrl: string) {
  const candidates = [targetUrl];

  try {
    const hostname = new URL(targetUrl).hostname;
    candidates.push(
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`,
    );
  } catch {
    return candidates;
  }

  return [...new Set(candidates)];
}

/**
 * Tries to fetch an image response for a favicon URL.
 */
async function fetchFaviconResponse(url: string) {
  try {
    const upstreamResponse = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: ONE_DAY_IN_SECONDS },
      headers: {
        accept: "image/*,*/*;q=0.8",
        "user-agent": "Mozilla/5.0 (compatible; favicon-proxy/1.0)",
      },
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    if (!upstreamResponse.ok || !contentType.startsWith("image/")) {
      return null;
    }

    const imageBuffer = await upstreamResponse.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "content-type": contentType,
        "cache-control": `public, max-age=${ONE_DAY_IN_SECONDS}, s-maxage=${ONE_DAY_IN_SECONDS}, stale-while-revalidate=604800`,
      },
    });
  } catch {
    return null;
  }
}

/**
 * Proxies favicon requests through the app domain and applies caching.
 */
export async function GET(request: NextRequest) {
  const targetUrl = getValidatedTargetUrl(
    request.nextUrl.searchParams.get("url"),
  );

  if (!targetUrl) {
    return NextResponse.redirect(new URL(DEFAULT_ICON_PATH, request.url));
  }

  const candidateUrls = getCandidateUrls(targetUrl);
  for (const candidateUrl of candidateUrls) {
    const response = await fetchFaviconResponse(candidateUrl);
    if (response) {
      return response;
    }
  }

  return NextResponse.redirect(new URL(DEFAULT_ICON_PATH, request.url));
}
