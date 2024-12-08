import { useEffect, useRef, useState } from "react";

interface ContextValue {
  visible: boolean;
  posX: any;
  posY: any;
}

export default function PlayGroundPage() {
  const [contextData, setContextData] = useState<ContextValue>({
    visible: false,
    posX: 0,
    posY: 0,
  });
  const contextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setContextData((contextData) => ({ ...contextData, visible: false }));
      }
    }

    const handleRightClick = (e: any) => {
      e.preventDefault();
      setContextData((oldState) => ({
        visible: true,
        posX: e.clientX,
        posY: e.clientY,
      }));
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("contextmenu", handleRightClick);

    return () => {
      // Unbind the event listener on clean up
      document.addEventListener("contextmenu", handleRightClick);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div style={{ height: "80vh", zIndex: 0 }}>hi this is playground</div>
      {contextData.visible && (
        <div
          ref={contextRef}
          style={{
            left: contextData.posX,
            top: contextData.posY,
            border: "solid black",
            position: "absolute",
          }}
        >
          lol
        </div>
      )}
    </div>
  );
}
