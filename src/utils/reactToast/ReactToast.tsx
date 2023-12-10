"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {};

export default function ReactToast({}: Props) {
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
