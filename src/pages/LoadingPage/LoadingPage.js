import React from "react";
import { useLocation } from "react-router-dom";

function LoadingPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <h2 className="title">
      <span role="img" aria-label={`Loading page "${currentPath}".`}>
        ⏳
      </span>
    </h2>
  );
}

export default LoadingPage;
