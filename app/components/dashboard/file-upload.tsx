"use client";
import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, X } from "lucide-react";

interface FileUploadProps {
  isLoading: boolean;
  hasData: boolean;
  uploadError: string;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearData: () => void;
}

export function FileUpload({
  isLoading,
  hasData,
  uploadError,
  handleFileUpload,
  onClearData,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="mb-8 bg-card/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Import Your Trades</CardTitle>
        <CardDescription>
          Upload a CSV file with columns: symbol, shares, price, date
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Processing..." : "Upload CSV"}
          </Button>
          {hasData && (
            <Button
              onClick={onClearData}
              variant="destructive"
              className="w-full md:w-auto"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Data
            </Button>
          )}
        </div>
        {uploadError && (
          <p className="text-sm text-destructive mt-4">{uploadError}</p>
        )}
      </CardContent>
    </Card>
  );
}
