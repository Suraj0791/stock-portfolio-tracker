"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedSector: string;
  setSelectedSector: (value: string) => void;
  sectors: string[];
}

export function FilterControls({
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  sectors,
}: FilterControlsProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by symbol..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select value={selectedSector} onValueChange={setSelectedSector}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="All Sectors" />
        </SelectTrigger>
        <SelectContent>
          {sectors.map((sector) => (
            <SelectItem key={sector} value={sector}>
              {sector === "all" ? "All Sectors" : sector}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}