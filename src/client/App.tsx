import { useMemo } from "react";
import { EditorPage } from "./pages/EditorPage";
import { ViewPage } from "./pages/ViewPage";

export function App() {
  const route = useMemo(() => {
    const path = window.location.pathname;
    if (path.startsWith("/s/")) {
      return { page: "view" as const, encoded: path.slice(3) };
    }
    return { page: "editor" as const, encoded: null };
  }, []);

  if (route.page === "view" && route.encoded) {
    return <ViewPage encoded={route.encoded} />;
  }

  return <EditorPage />;
}
