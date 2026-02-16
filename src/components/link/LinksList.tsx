"use client";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchInput } from "@/components/home/SearchSection";
import { useSearch } from "@/hooks/useSearch";
import { categoryOrder, socialMediaLinks } from "@/lib/social";

type LinkCategoryFilter = SocialMediaLink["category"];

const LINK_SORT_MODE_STORAGE_KEY = "links-page-sort-mode";

/**
 * Defines sorting modes for the links list.
 */
type LinkSortMode = "category" | "label-asc" | "label-desc";

/**
 * Checks whether a value is a valid link sort mode.
 */
function isLinkSortMode(value: string): value is LinkSortMode {
  return (
    value === "category" || value === "label-asc" || value === "label-desc"
  );
}

/**
 * Checks whether a social media link matches the active search query.
 */
function matchesQuery(link: SocialMediaLink, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  return [link.label, link.category, link.link.toString(), ...link.type].some(
    (value) => value.toLowerCase().includes(normalizedQuery),
  );
}

/**
 * Checks whether a social media link matches selected categories.
 */
function matchesCategory(
  link: SocialMediaLink,
  categories: LinkCategoryFilter[],
) {
  if (categories.length === 0) {
    return true;
  }

  return categories.includes(link.category);
}

/**
 * Toggles one category in a multi-select list.
 */
function toggleCategory(
  currentCategories: LinkCategoryFilter[],
  category: LinkCategoryFilter,
) {
  if (currentCategories.includes(category)) {
    return currentCategories.filter((item) => item !== category);
  }

  return [...currentCategories, category];
}

/**
 * Sorts links by the selected sort mode.
 */
function sortLinks(links: SocialMediaLink[], sortMode: LinkSortMode) {
  return [...links].sort((left, right) => {
    if (sortMode === "label-asc") {
      return left.label.localeCompare(right.label);
    }

    if (sortMode === "label-desc") {
      return right.label.localeCompare(left.label);
    }

    const categoryDiff =
      categoryOrder[left.category] - categoryOrder[right.category];
    if (categoryDiff !== 0) {
      return categoryDiff;
    }

    return left.label.localeCompare(right.label);
  });
}

/**
 * Creates a stable Umami event name from a link title.
 */
function getUmamiEventNameFromTitle(title: string) {
  const normalizedTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `links-list-${normalizedTitle || "item"}-click`;
}

/**
 * Creates a stable Umami event name from a category label.
 */
function getUmamiEventNameFromCategory(category: string) {
  const normalizedCategory = category
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `links-category-${normalizedCategory || "item"}-click`;
}

/**
 * Renders a searchable list of all short links.
 */
export default function LinksList() {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch("links-page");
  const [selectedCategories, setSelectedCategories] = useState<
    LinkCategoryFilter[]
  >([]);
  const [sortMode, setSortMode] = useState<LinkSortMode>("category");

  useEffect(() => {
    const savedSortMode = localStorage.getItem(LINK_SORT_MODE_STORAGE_KEY);
    if (savedSortMode && isLinkSortMode(savedSortMode)) {
      setSortMode(savedSortMode);
    }
  }, []);

  /**
   * Updates and persists the selected sorting mode.
   */
  const handleSetSortMode = useCallback((newSortMode: LinkSortMode) => {
    setSortMode(newSortMode);
    localStorage.setItem(LINK_SORT_MODE_STORAGE_KEY, newSortMode);
  }, []);

  const displayedLinks = useMemo(() => {
    const filteredLinks = socialMediaLinks.filter(
      (socialMediaLink) =>
        matchesQuery(socialMediaLink, searchQuery) &&
        matchesCategory(socialMediaLink, selectedCategories),
    );

    return sortLinks(filteredLinks, sortMode);
  }, [searchQuery, selectedCategories, sortMode]);

  const categoryFilters = useMemo(() => {
    const categories = Array.from(
      new Set(
        socialMediaLinks.map((socialMediaLink) => socialMediaLink.category),
      ),
    );
    categories.sort(
      (left, right) => categoryOrder[left] - categoryOrder[right],
    );
    return categories;
  }, []);

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clearSearch={clearSearch}
        showClearButton={!!searchQuery}
        placeholder="Search links..."
      />

      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
      >
        <Chip
          size="small"
          label="All"
          clickable
          onClick={() => setSelectedCategories([])}
          data-umami-event="links-category-all-click"
          color={selectedCategories.length === 0 ? "primary" : "default"}
          variant={selectedCategories.length === 0 ? "filled" : "outlined"}
        />
        {categoryFilters.map((category) => (
          <Chip
            key={category}
            size="small"
            label={category}
            clickable
            onClick={() =>
              setSelectedCategories((currentCategories) =>
                toggleCategory(currentCategories, category),
              )
            }
            data-umami-event={getUmamiEventNameFromCategory(category)}
            data-umami-event-category={category}
            color={
              selectedCategories.includes(category) ? "primary" : "default"
            }
            variant={
              selectedCategories.includes(category) ? "filled" : "outlined"
            }
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
      >
        <Chip
          size="small"
          label="Category"
          clickable
          onClick={() => handleSetSortMode("category")}
          data-umami-event="links-sort-category-click"
          color={sortMode === "category" ? "primary" : "default"}
          variant={sortMode === "category" ? "filled" : "outlined"}
        />
        <Chip
          size="small"
          label="A → Z"
          clickable
          onClick={() => handleSetSortMode("label-asc")}
          data-umami-event="links-sort-az-click"
          color={sortMode === "label-asc" ? "primary" : "default"}
          variant={sortMode === "label-asc" ? "filled" : "outlined"}
        />
        <Chip
          size="small"
          label="Z → A"
          clickable
          onClick={() => handleSetSortMode("label-desc")}
          data-umami-event="links-sort-za-click"
          color={sortMode === "label-desc" ? "primary" : "default"}
          variant={sortMode === "label-desc" ? "filled" : "outlined"}
        />
      </Stack>

      {searchQuery || selectedCategories.length > 0 ? (
        <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
          {displayedLinks.length} result{displayedLinks.length !== 1 ? "s" : ""}{" "}
          found
        </Typography>
      ) : null}

      <Paper variant="outlined" sx={{ borderColor: "divider" }}>
        <List disablePadding>
          {displayedLinks.map((social) => {
            const primarySlug = social.type[0];
            const aliases = social.type.slice(1);
            const umamiEventName = getUmamiEventNameFromTitle(social.label);

            return (
              <ListItemButton
                key={primarySlug}
                component="a"
                href={`/link/${primarySlug}`}
                divider
                data-umami-event={umamiEventName}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: social.iconColor ?? "action.active",
                    "& svg": {
                      color: social.iconColor ?? "action.active",
                    },
                  }}
                >
                  {social.icon}
                </ListItemIcon>
                <ListItemText
                  primary={social.label}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ display: "block", color: "text.secondary" }}
                      >
                        {`/link/${primarySlug}`}
                      </Typography>
                      {aliases.length ? (
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ display: "block", color: "text.secondary" }}
                        >
                          {`aliases: ${aliases.join(", ")}`}
                        </Typography>
                      ) : null}
                    </>
                  }
                  slotProps={{
                    primary: { fontWeight: 600 },
                  }}
                />
                <Stack direction="row" spacing={1}>
                  {social.external ? (
                    <Chip
                      size="small"
                      icon={<OpenInNewIcon />}
                      label="External"
                      sx={{
                        bgcolor: "transparent",
                      }}
                    />
                  ) : null}
                </Stack>
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    </>
  );
}
