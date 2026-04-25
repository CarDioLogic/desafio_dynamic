import type { Dev } from "../../../core/interfaces";

type Props = {
  dev: Dev;
  presentDetails: boolean;
};

export default function DeveloperCard({ dev, presentDetails }: Props) {
  return (
    <div className="border-4 border-slate-600 rounded-lg bg-slate-200 hover:bg-slate-300 p-2 shadow">
        <h1 className="font-bold text-xl">{presentDetails ? dev.name : `Nickname: ${dev.nickname}`}</h1>

        {presentDetails && (
            <div className="flex justify-between">
                <h4>{dev.nickname}</h4>

                <div className="items-center flex gap-2" title="Birthday">
                    <img src="/icons/cake.svg" alt="cake icon" className="invert" />
                    <h4>{dev.birth_date}</h4>
                </div>                
            </div>
        )}

        {dev.stack_names?.length > 0 ? (
            <p>Stacks: {dev.stack_names.join(", ")};</p>
        ) :
        (<p>-</p>)}      
    </div>
  );
}