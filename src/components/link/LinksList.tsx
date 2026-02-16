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
import { useMemo, useState } from "react";
import { SearchInput } from "@/components/home/SearchSection";
import { useSearch } from "@/hooks/useSearch";
import { categoryOrder, socialMediaLinks } from "@/lib/social";

type LinkCategoryFilter = SocialMediaLink["category"];

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
 * Renders a searchable list of all short links.
 */
export default function LinksList() {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch("links-page");
  const [selectedCategories, setSelectedCategories] = useState<
    LinkCategoryFilter[]
  >([]);

  const sortedLinks = useMemo(() => {
    return [...socialMediaLinks].sort((left, right) => {
      const categoryDiff =
        categoryOrder[left.category] - categoryOrder[right.category];
      if (categoryDiff !== 0) {
        return categoryDiff;
      }

      return left.label.localeCompare(right.label);
    });
  }, []);

  const filteredLinks = useMemo(() => {
    return sortedLinks.filter(
      (link) =>
        matchesQuery(link, searchQuery) &&
        matchesCategory(link, selectedCategories),
    );
  }, [searchQuery, selectedCategories, sortedLinks]);

  const categoryFilters = useMemo(() => {
    const categories = Array.from(
      new Set(sortedLinks.map((link) => link.category)),
    );
    categories.sort(
      (left, right) => categoryOrder[left] - categoryOrder[right],
    );
    return categories;
  }, [sortedLinks]);

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
            color={
              selectedCategories.includes(category) ? "primary" : "default"
            }
            variant={
              selectedCategories.includes(category) ? "filled" : "outlined"
            }
          />
        ))}
      </Stack>

      {searchQuery || selectedCategories.length > 0 ? (
        <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
          {filteredLinks.length} result{filteredLinks.length !== 1 ? "s" : ""}{" "}
          found
        </Typography>
      ) : null}

      <Paper variant="outlined" sx={{ borderColor: "divider" }}>
        <List disablePadding>
          {filteredLinks.map((social) => {
            const primarySlug = social.type[0];
            const aliases = social.type.slice(1);

            return (
              <ListItemButton
                key={primarySlug}
                component="a"
                href={`/link/${primarySlug}`}
                divider
                data-umami-event="links-list-item-click"
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{social.icon}</ListItemIcon>
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
