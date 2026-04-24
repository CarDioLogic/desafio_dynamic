import { useState } from "react";
import TextInput from "../General/Inputs/TextInput";

interface DeveloperFilterProps {
  setFilter: (filter: string) => void;
  filterTerm: string;
}

export default function DeveloperFilter({
  setFilter,
  filterTerm,
}: DeveloperFilterProps) {
  const [value, setValue] = useState(filterTerm);

  return (
    <div className="flex justify-between gap-2 my-2 p-2 border rounded-lg items-center">
        <label htmlFor="filterTerm" className="w-fit whitespace-nowrap">Filter term:</label>

        <TextInput 
          id="filterTerm"
          value={value}
          onChange={setValue}
        />

      <div onClick={() => setFilter(value)} className="bg-slate-600 text-white px-2 rounded-lg cursor-pointer hover:text-slate-600 hover:bg-white border border-slate-300 hover:border-slate-600">
        Search
      </div>
    </div>
  );
}