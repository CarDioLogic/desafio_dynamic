import ModalWrapper from "../General/ModalWrapper";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import TextInput from "../General/Inputs/TextInput";
import { saveDev } from "../../../api/client";
import type { Dev } from "../../../core/interfaces";
import LoadingSpinner from "../General/LoadingSpinner";

export default function CreateDeveloperModal({
  setCreateDevModal,
}: {
  setCreateDevModal: (open: boolean) => void;
}) {
  const [newDev, setNewDev] = useState<Dev>({
    nickname: "",
    name: "",
    birth_date: "",
    stack_names: [],
  });
  const [stackInput, setStackInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const addStack = () => {
    if (!stackInput.trim()) return;

    setNewDev((prev) => ({
      ...prev,
      stack_names: [...(prev.stack_names ?? []), stackInput.trim()],
    }));

    setStackInput("");
  };

  const removeStack = (index: number) => {
    setNewDev((prev) => ({
      ...prev,
      stack_names: prev.stack_names?.filter((_, i) => i !== index) ?? [],
    }));
  };

  const handleSaveDev = async () => {
    try {
      setIsSaving(true);
      const response = await saveDev(newDev);
      console.log("Dev saved:", response)
      setCreateDevModal(false);
    } catch (error) {
      console.error("Failed to save dev:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ModalWrapper setCloseModal={setCreateDevModal}>
      <div>
        <h1>Create developer</h1>

        <div className="my-2">
          <label>Nickname:</label>
          <TextInput
            placeholder="nickname"
            value={newDev.nickname}
            onChange={(v) =>
              setNewDev((prev) => ({
                ...prev,
                nickname: v,
              }))
            }
          />
        </div>

        <div className="my-2">
          <label>Name:</label>
          <TextInput
            placeholder="name"
            value={newDev.name}
            onChange={(v) =>
              setNewDev((prev) => ({
                ...prev,
                name: v,
              }))
            }
          />
        </div>

        <div className="my-2 flex flex-col">
          <label>Birth date:</label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              minDate={dayjs().subtract(120, "year")}
              maxDate={dayjs()}
              value={newDev.birth_date ? dayjs(newDev.birth_date) : null}
              onChange={(value: Dayjs | null) =>
                setNewDev((prev) => ({
                  ...prev,
                  birth_date: value ? value.format("YYYY-MM-DD") : "",
                }))
              }
            />
          </LocalizationProvider>
        </div>

        <div className="my-2">
          <label>Stacks:</label>

          <div className="flex gap-2">
            <TextInput
              value={stackInput}
              onChange={setStackInput}
              placeholder="e.g. Laravel"
            />

            <button
              onClick={addStack}
              className="bg-gray-600 text-white px-2 rounded cursor-pointer"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {newDev.stack_names?.map((stack, index) => (
              <div
                key={index}
                className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2"
              >
                {stack}
                <button
                  onClick={() => removeStack(index)}
                  className="text-red-600 cursor-pointer"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end mt-4">
          {
            isSaving ? (
              <LoadingSpinner/>
            ) : (
              <button
                onClick={handleSaveDev}
                className="bg-slate-600 text-white px-3 py-1 rounded cursor-pointer"
              >
                Create
              </button>
            )
          }         
        </div>
      </div>
    </ModalWrapper>
  );
}