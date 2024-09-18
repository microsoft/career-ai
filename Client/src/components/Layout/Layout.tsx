import * as React from "react";
import { Footer } from "./Footer";
import { LeftNav } from "./LeftNav";
import { SkipToMain } from "./SkipToMain";
import { RightAside } from "./RightAside";
import "./Layout.scss";

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout(props: LayoutProps): React.ReactElement {
  const { children } = props;

  return (
    <>
      <SkipToMain />
      <div className="content-container">
        <LeftNav />
        <div className="main-container">
          <main className="main" id="main" tabIndex={-1}>
            {children}
          </main>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
        <RightAside />
      </div>
    </>
  );
}
