"use client";
import React, { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import axios from "axios";

export default function AlertBar() {
  const [alertData, setAlertData] = useState({ message: "", isActive: false });

  useEffect(() => {
    fetchAlertData();
  }, []);

  const fetchAlertData = async () => {
    const response = await axios.get("/api/alert");

    setAlertData(response.data.alert);
  };
  if (!alertData.isActive) return;
  return (
    <Alert variant="destructive" className="text-white ">
      <AlertTriangle className="w-6 h-7 mr-2" color="white" />
      <AlertTitle className="font-bold text-xl">ALERT</AlertTitle>
      <AlertDescription className=" text-xl">
        {alertData.message}
      </AlertDescription>
    </Alert>
  );
}
