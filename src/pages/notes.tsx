import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect, useRef } from "react";

export default function NotesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D | null | undefined) => {
    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(50, 100, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

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
      const myImage = canvasRef.current?.toDataURL("image/png");
      console.log(myImage);
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
