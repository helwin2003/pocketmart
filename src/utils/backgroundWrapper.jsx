import React from "react";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const BackgroundWrap = ({
  backgroundImage,
  bgColor = "lightyellow",
  opacity = 1,
  children,
}) => {
  const screens = useBreakpoint();
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        style={{
          position: "fixed",
          marginTop: "0px",
          top: 0,
          right: 0,
          bottom: 0,
          left: screens.md && location.pathname === "/app" ? "200px" : "0",
          backgroundColor: bgColor,
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : bgColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: opacity,
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default BackgroundWrap;
