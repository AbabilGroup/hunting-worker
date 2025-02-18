"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import { cn } from "@/lib/utils";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={cn("flex flex-col min-h-screen bg-background")}>
      <Navbar />
      <main className="flex-grow pt-24 container mx-auto text-primary-foreground">
        {children}
      </main>
    </div>
  );
};

export default Layout;
