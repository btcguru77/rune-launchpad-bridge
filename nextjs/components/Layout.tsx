"use client";
import React from "react";
import AppBar from "./AppBar";

export default function Layout(props) {
  return (
    <div>
      <div className="flex items-center flex-col min-h-screen pt-[80px] pb-[120px] relative mx-2">
        <AppBar />
        <div className="flex items-center flex-col w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
}
