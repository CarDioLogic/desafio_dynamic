import ModalWrapper from "../General/ModalWrapper"
import type { Dev } from "../../../core/interfaces";
import DeveloperCard from "./DeveloperCard";

type Props = {
  dev: Dev;
  setDetailsModalOpen: (isOpen:boolean) => void
};

export default function DeveloperDetailsModal({ dev, setDetailsModalOpen }:Props) {
    //making the request again for details to avoid stale data

  return (
    <ModalWrapper setCloseModal={setDetailsModalOpen}>
        <DeveloperCard dev={dev} presentDetails={true}/>
    </ModalWrapper>  
    )
}
