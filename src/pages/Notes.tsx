import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect, useRef } from "react";

export default function NotesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    let isPainting = false;
    let lineWidth = 5;
    // let startX: number;
    // let startY: number;
    const canvasOffsetX = canvasRef.current?.offsetLeft;
    const canvasOffsetY = canvasRef.current?.offsetTop;
    console.debug("canvasRef", {
      canvasRef,
      context,
      canvasOffsetX,
      canvasOffsetY,
      test:
        canvasRef.current &&
        context &&
        canvasOffsetX !== undefined &&
        canvasOffsetY !== undefined,
    });

    if (
      canvasRef.current &&
      context &&
      canvasOffsetX !== undefined &&
      canvasOffsetY !== undefined
    ) {
      canvasRef.current.width = window.innerWidth - canvasOffsetX;
      canvasRef.current.height = window.innerHeight - canvasOffsetY;
      canvasRef.current.onmousedown = (ev: MouseEvent) => {
        isPainting = true;
        // startX = ev.clientX;
        // startY = ev.clientY;
        return null;
      };
      canvasRef.current.onmouseup = (ev: MouseEvent) => {
        isPainting = false;
        context?.stroke();
        context?.beginPath();
      };
      canvasRef.current.onmousemove = (e) => {
        if (!isPainting) {
          return;
        }

        context.lineWidth = lineWidth;
        context.lineCap = "round";

        context?.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
        context?.stroke();
      };
    }
  }, [canvasRef]);

  const putImage = () => {
    if (canvasRef.current?.getContext) {
      const image = new Image();
      image.src = canvasRef.current?.toDataURL();
      const link = document.createElement("a");
      link.href = image.src;
      link.download = "todo.jpg";
      link.click();
    }
  };

  return (
    <>
      <Box>Yo im notes</Box>
      <Button variant="contained" onClick={putImage}>
        Save
      </Button>
      <Box>
        <canvas ref={canvasRef} id="drawing-board"></canvas>
      </Box>
    </>
  );
}
