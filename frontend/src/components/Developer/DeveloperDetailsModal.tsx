import ModalWrapper from "../General/ModalWrapper"
import type { Dev } from "../../../core/interfaces";
import DeveloperCard from "./DeveloperCard";
import { useEffect, useState } from "react";
import { getDev } from "../../../api/client";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../General/LoadingSpinner";

type Props = {
  devId: string;
  setDetailsModalOpen: (isOpen:boolean) => void
};

export default function DeveloperDetailsModal({ devId, setDetailsModalOpen }:Props) {
    const [loading, setLoading] = useState(false);
    const [dev, setDev] = useState<Dev | null>(null);

    useEffect(() => {
        async function loadDev() {
        setLoading(true);

        try {
            const results = await getDev(devId);
            setDev(results);
        } catch (error:any) {
            const apiError = error?.response?.data;

            console.error("Failed to save dev:", apiError || error);

            const message =
            apiError?.message ||
            apiError?.error ||
            "Failed to load developer";

            toast.error(message);
        } finally {
            setLoading(false);
        }
        }

        loadDev();

    }, [devId])

    return (
        <ModalWrapper setCloseModal={setDetailsModalOpen}>
            {loading && (
                <LoadingSpinner />
            )}

            {(dev != null && !loading) && (
                <DeveloperCard dev={dev} presentDetails={true} />
            )}
        </ModalWrapper>
    );
}
