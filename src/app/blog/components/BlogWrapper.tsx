"use client";

import BackToHome from "@/components/BackToHome";
import ArticleNavigation from "@/components/ArticleNavigation";
import ReadingTime from "@/components/ReadingTime";
import ScrollProgress from "@/components/ScrollProgress";
import ShareButton from "@/components/ShareButton";
import { Box, Container, Paper, Typography, alpha } from "@mui/material";

interface BlogData {
    href: string;
    title: string;
    lastModified: string;
}

interface BlogWrapperProps {
    children: React.ReactNode;
    currentPost?: BlogData | null;
    prevPost?: BlogData | null;
    nextPost?: BlogData | null;
    postContent: string;
}

export default function BlogWrapper({
    children,
    currentPost,
    prevPost,
    nextPost,
    postContent,
}: BlogWrapperProps) {
    return (
        <Container maxWidth="lg">
            {/* Progress Bar */}
            <ScrollProgress />

            <Box sx={{ py: 2 }}>
                <BackToHome />

                {/* Article Meta */}
                {currentPost && (
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            mb: 3,
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.02),
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 2,
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                                <ReadingTime>{postContent}</ReadingTime>
                                <Typography variant="body2" color="text.secondary">
                                    Published:{" "}
                                    {new Date(currentPost.lastModified).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        },
                                    )}
                                </Typography>
                            </Box>

                            {/* Share Button */}
                            <ShareButton title={currentPost.title} contentType="post" />
                        </Box>
                    </Paper>
                )}

                {/* Main Content */}
                <Box component="main" sx={{ mb: 4 }}>
                    {children}
                </Box>

                {/* Navigation between articles */}
                <ArticleNavigation
                    prevArticle={prevPost}
                    nextArticle={nextPost}
                    prevLabel="Previous Post"
                    nextLabel="Next Post"
                />
            </Box>
        </Container>
    );
}