declare module "rss" {
  export interface Enclosure {
    url: string;
    size?: number | string;
    type?: string;
  }

  export interface ItemOptions {
    title?: string;
    description?: string;
    url?: string;
    guid?: string;
    author?: string;
    date?: string | Date;
    categories?: string[];
    enclosure?: Enclosure;
    // allow extra fields if needed (content:encoded etc.)
    [key: string]: unknown;
  }

  export interface FeedOptions {
    title: string;
    description?: string;
    feed_url?: string;
    site_url?: string;
    image_url?: string;
    docs?: string;
    managingEditor?: string;
    webMaster?: string;
    copyright?: string;
    language?: string;
    categories?: string[];
    pubDate?: string | Date;
    ttl?: number;
    // allow additional optional fields
    [key: string]: unknown;
  }

  declare class RSS {
    constructor(options?: FeedOptions);
    item(item: ItemOptions): void;
    xml(options?: { indent?: boolean }): string;
  }

  export default RSS;
}
