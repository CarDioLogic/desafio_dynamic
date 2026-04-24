import { useState, useEffect } from "react";
import { getDevs } from '../../../api/client';
import LoadingSpinner from "../General/LoadingSpinner";
import type { Dev } from "../../../core/interfaces";
import DeveloperCard from "./DeveloperCard";
import DeveloperFilter from "./DeveloperFilter";
import DeveloperDetailsModal from "./DeveloperDetailsModal";

export default function DeveloperList() {
  const [devs, setDevs] = useState<Dev[] | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedDev, setSelectedDev] = useState<Dev | null>(null);
  const [filterTerms, setFilterTerms] = useState<string>("");    
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDevs() {
      setLoading(true);

      try {
        const results = await getDevs(filterTerms);
        setDevs(results);
      } catch (error) {
        console.error("Failed to load devs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDevs();
  }, [filterTerms]);

  return (
    <div className="grid gap-4">
      <h1 className="text-center font-bold text-4xl text-slate-800">Developers</h1>
      <DeveloperFilter setFilter={setFilterTerms} filterTerm={filterTerms}/>

      {
        loading ? (
          <LoadingSpinner />
        ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {devs?.map((dev, i) => (   
            <div  key={`developer_${i}`} title="Click to see more details about the developer"
            className="w-[500px] cursor-pointer"
            onClick={() => {
              setDetailsModalOpen(true);
              setSelectedDev(dev);
            }}>
              <DeveloperCard dev={dev} presentDetails={false}/>
            </div>                 
          ))}
        </div>
        )
      }

      { (detailsModalOpen && selectedDev) && (
        <DeveloperDetailsModal dev={selectedDev} setDetailsModalOpen={setDetailsModalOpen}/>
      )}
    </div>
  )
}
