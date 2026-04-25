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
    <div className="flex flex-col my-2 p-2 border rounded-lg">
        <div className="flex justify-between gap-2 items-center">
            <label htmlFor="filterTerm" className="w-fit whitespace-nowrap font-bold">Filter term:</label>

            <TextInput 
            id="filterTerm"
            value={value}
            onChange={setValue}
            />

        <div onClick={() => setFilter(value)} className="hover:bg-slate-600 hover:text-slate-50 px-2 rounded-lg cursor-pointer text-slate-600 bg-slate-50 border hover:border-slate-300 border-slate-600">
            Search
        </div>    
        </div>
      <label htmlFor="">
        <em>Find by developer nickname, name or tech stack</em>
      </label>
    </div>
  );
}