import { Container } from "@/presentation/_shared/components/Container";
import Navbar from "@/presentation/_shared/components/Navbar/Navbar";
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface PrimaryLayoutProps extends PropsWithChildren {
  className?: string;
}

function PrimaryLayout(props: PrimaryLayoutProps) {
  const { children, className } = props;

  return (
    <div className={twMerge(" h-full min-h-[100vh] w-full ", className || "")}>
      <Container className=" mb-12 ">
        <Navbar />
      </Container>

      {children}
    </div>
  );
}

export default PrimaryLayout;
