import { getTollsBetweenOriginAndDestination } from "@/apicalls/tollGuru";
import Input from "@/components/Input/Input";
import TollCalculateForm from "@/components/TollCalculateForm/TollCalculateForm";
import React, { useState } from "react";

export default function Home() {

  return (
    <main>
      <h1 className="text-2xl font-semibold">Toll Calculator</h1>
      <TollCalculateForm />
    </main>
  );
}
