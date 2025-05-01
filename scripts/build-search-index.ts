#!/usr/bin/env bun

import { buildSearchIndex } from '../src/lib/build-search-index';

// Build search index
buildSearchIndex()
  .then(() => {
    console.log('Search index built successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error building search index:', error);
    process.exit(1);
  });
