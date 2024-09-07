import * as React from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SkipToMain } from "./SkipToMain";
import "./Layout.scss";
import { Header } from "./Header";
import { usePageTracking } from "../../hooks/usePageTracking";

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout(props: LayoutProps): React.ReactElement {
  const { children } = props;

  usePageTracking();

  return (
    <>
      <SkipToMain />
      <div className="header-container">
        <Header />
      </div>
      <div className="content-container">
        <Nav />
        <div className="main-container">
          <main className="main" id="main">
            {children}
          </main>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
