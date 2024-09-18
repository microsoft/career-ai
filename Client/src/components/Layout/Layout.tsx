import * as React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SkipToMain } from "./SkipToMain";
import "./Layout.scss";

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout(props: LayoutProps): React.ReactElement {
  const { children } = props;

  return (
    <>
      <SkipToMain />
      <div className="header-container">
        <Header />
      </div>
      <div className="content-container">
        <div className="main-container">
          <main className="main" id="main" tabIndex={-1}>
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
