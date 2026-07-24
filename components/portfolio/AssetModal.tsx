import { useState } from "react";
import { Asset } from "@/hooks/useAssets";

type AssetModalProps = {
  isOpen: boolean;

  setIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setAssets: React.Dispatch<
    React.SetStateAction<Asset[]>
  >;
};

export default function AssetModal({
    isOpen,
    setIsOpen,
    setAssets,
}:  AssetModalProps) {

    const [name, setName] = useState("");
    const [type, setType] = useState("Gold");
    const [value, setValue] = useState("");
    function handleSave() {

        if (
            !name ||
            !value
        ) return;

        setAssets((prev) => [

            ...prev,

            {
            name,
            type,
            value: Number(value),
            },

        ]);

        setName("");
        setType("Gold");
        setValue("");

        setIsOpen(false);

    }

  if (!isOpen) return null;

  return (
    <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/60"
    >
        <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-neutral-900 p-6"
        >

            <div className="mb-5">

                <label className="mb-2 block text-sm">
                    Asset Name
                </label>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                    w-full
                    rounded-xl
                    border
                    border-neutral-700
                    bg-neutral-800
                    p-3
                    transition-all
                    duration-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                    focus:border-emerald-500
                    "                    
                    placeholder="Gold"
                />

            </div>

            <div className="mb-5">

                <label className="mb-2 block text-sm">
                    Asset Type
                </label>

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="
                    w-full
                    rounded-xl
                    border
                    border-neutral-700
                    bg-neutral-800
                    p-3
                    transition-all
                    duration-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                    focus:border-emerald-500
                    "                
                >

                    <option>Gold</option>
                    <option>Crypto</option>
                    <option>Cash</option>
                    <option>Stock</option>

                </select>

            </div>

            <div className="mb-6">

                <label className="mb-2 block text-sm">
                    Value
                </label>

                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="
                    w-full
                    rounded-xl
                    border
                    border-neutral-700
                    bg-neutral-800
                    p-3
                    transition-all
                    duration-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                    focus:border-emerald-500
                    "                    
                    placeholder="250000"
                />

            </div>

            <div className="flex justify-end gap-3">

                <button
                    onClick={handleSave}
                    className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black"
                >
                    Save
                </button>

            </div>

        </div>

    </div>
  );
}