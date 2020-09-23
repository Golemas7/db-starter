import React from "react";
import { useLocation } from "react-router-dom";

function NotFoundPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <h2 className="title" data-testid="not-found-path-value">
      Page not found &quot;{currentPath}&quot;{" "}
      <span role="img" aria-label="Sad face.">
        😟
      </span>
    </h2>
  );
}

export default NotFoundPage;
