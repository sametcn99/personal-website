"use client";

import { Modal, Fade, Box, IconButton, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
}

/**
 * Checks if the given URL is a badge image (e.g., shields.io, badge.fury.io, etc.)
 * @param src - The image source URL
 * @returns True if the URL is a badge image
 */
function isBadgeImage(src: string): boolean {
  const badgeHosts = [
    "img.shields.io",
    "badge.fury.io",
    "badges.gitter.im",
    "badgen.net",
    "flat.badgen.net",
    "codecov.io",
    "coveralls.io",
    "travis-ci.org",
    "travis-ci.com",
    "circleci.com",
    "github.com/workflows",
  ];
  return badgeHosts.some((host) => src.includes(host));
}

export function ImageComponent({ alt, ...props }: ImageProps) {
  const theme = useTheme();
  const { width, height, src, style, ...rest } = props;
  const [open, setOpen] = React.useState(false);

  // The src prop is required by Next.js Image, but optional in standard HTML attributes.
  if (!src) return null;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Render badge images inline without zoom functionality (like GitHub)
  if (isBadgeImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt || "Badge"}
        src={src}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          height: "auto",
          marginRight: theme.spacing(0.5),
          ...style,
        }}
        {...rest}
      />
    );
  }

  return (
    <>
      <Image
        alt={alt || "Image"}
        src={src as string}
        width={0}
        height={0}
        sizes="100vw"
        onClick={handleOpen}
        style={{
          width: "100%",
          height: "auto",
          cursor: "zoom-in",
          borderRadius:
            typeof theme.shape.borderRadius === "number"
              ? theme.shape.borderRadius * 2
              : 8,
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
          ...style,
        }}
        {...rest}
      />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(1px)",
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              outline: "none",
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                color: "white",
                zIndex: 10,
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100vh",
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={src as string}
                  alt={alt || "Full screen image"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    objectFit: "contain",
                  }}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
