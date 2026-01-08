"use client";

import {
  Box,
  Typography,
  IconButton,
  Paper,
  ImageList,
  ImageListItem,
} from "@mui/material";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useState } from "react";

interface PrescriptionViewerProps {
  images: string[];
}

export default function PrescriptionViewer({
  images,
}: PrescriptionViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setZoom(1);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  if (images.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "grey.100",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Prescription Images ({images.length})
        </Typography>
        <Box>
          <IconButton
            size="small"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut fontSize="small" />
          </IconButton>
          <Typography variant="caption" sx={{ mx: 1 }}>
            {Math.round(zoom * 100)}%
          </Typography>
          <IconButton size="small" onClick={handleZoomIn} disabled={zoom >= 3}>
            <ZoomIn fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Main Image */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.200",
          borderRadius: 1,
          overflow: "hidden",
          height: 200,
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Box
          component="img"
          src={images[selectedIndex]}
          alt={`Prescription ${selectedIndex + 1}`}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            transform: `scale(${zoom})`,
            transition: "transform 0.2s",
            objectFit: "contain",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/placeholder-prescription.png";
          }}
        />

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <ImageList sx={{ mt: 1, height: 60 }} cols={5} rowHeight={50} gap={4}>
          {images.map((img, index) => (
            <ImageListItem
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setZoom(1);
              }}
              sx={{
                cursor: "pointer",
                border:
                  index === selectedIndex
                    ? "2px solid"
                    : "2px solid transparent",
                borderColor:
                  index === selectedIndex ? "primary.main" : "transparent",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/placeholder-prescription.png";
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Paper>
  );
}
