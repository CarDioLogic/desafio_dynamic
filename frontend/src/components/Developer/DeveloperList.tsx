import { useState, useEffect } from "react";
import { getDevs } from '../../../api/client';
import LoadingSpinner from "../General/LoadingSpinner";
import type { Dev } from "../../../core/interfaces";
import DeveloperCard from "./DeveloperCard";
import DeveloperFilter from "./DeveloperFilter";
import DeveloperDetailsModal from "./DeveloperDetailsModal";
import { toast } from "react-hot-toast";

export default function DeveloperList() {
  const [devs, setDevs] = useState<Dev[] | null>([]);
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
      } catch (error:any) {
        const apiError = error?.response?.data;

        console.error("Failed to save dev:", apiError || error);

        const message =
          apiError?.message ||
          apiError?.error ||
          "Failed to load developers";

        toast.error(message);
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
          { devs?.length === 0 ? (<span className="font-bold text-2xl text-center">No developers to show. Use the filter term to find developers!</span>) :
            (devs?.map((dev, i) => (   
              <div  key={`developer_${i}`} title="Click to see more details about the developer"
              className="w-[500px] cursor-pointer"
              onClick={() => {
                setDetailsModalOpen(true);
                setSelectedDev(dev);
              }}>
                <DeveloperCard dev={dev} presentDetails={false}/>
              </div>                 
            )))
          }
        </div>
        )
      }

      { (detailsModalOpen && selectedDev) && (
        <DeveloperDetailsModal devId={selectedDev.id} setDetailsModalOpen={setDetailsModalOpen}/>
      )}
    </div>
  )
}
