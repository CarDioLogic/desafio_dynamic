import DeveloperList from "../components/Developer/DeveloperList"
import CreateDeveloperModal from "../components/Developer/DeveloperCreateModal";
import { useState } from "react";

export default function DevelopersPage() {
  const [createDevModal, setCreateDevModal] = useState(false);
  
  return (
    <div className="relative">
        <DeveloperList/>

        <div onClick={() => setCreateDevModal(true)}
          title="Add developer"
          className="cursor-pointer fixed text-4xl w-[50px] h-[50px] flex items-center justify-center bg-slate-800 rounded-full text-white bottom-5 left-5">
            <img src="icons/add.svg"/>
        </div>

      { (createDevModal) && (
        <CreateDeveloperModal setCreateDevModal={setCreateDevModal}/>
      )}
    </div>
  )
}
