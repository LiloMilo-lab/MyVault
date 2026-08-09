import { Account } from "@/types/account";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";

type AccountSummaryProps = {
  accounts: Account[];

  setAccounts: React.Dispatch<
    React.SetStateAction<Account[]>
  >;
};

export default function AccountSummary({
  accounts,
  setAccounts,
}: AccountSummaryProps) {
  const [name, setName] = useState("");

  const [type, setType] =
    useState<Account["type"]>("Bank");

  const addAccount = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const alreadyExists = accounts.some(
      (account) =>
        account.name.toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (alreadyExists) return;

    const newAccount: Account = {
      id: Date.now(),
      name: trimmedName,
      type,
      balance: 0,
      currency: "IDR",
      color: "#10B981",
    };

    setAccounts((prev) => [
      ...prev,
      newAccount,
    ]);

    setName("");
    setType("Bank");
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-800
        bg-neutral-900
        p-6
      "
    >
      <h2 className="text-xl font-bold">
        💳 Accounts
      </h2>

      <div className="mt-6 space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-neutral-800
              p-4
            "
          >
            <div>
              <p className="font-semibold">
                {account.name}
              </p>

              <p className="text-sm text-neutral-500">
                {account.currency}
              </p>
            </div>

            <p className="font-bold text-emerald-400">
              {formatCurrency(account.balance)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-neutral-800 pt-6">

        <h3 className="font-semibold">
          Add Account
        </h3>

        <div className="mt-4 grid gap-3 md:grid-cols-2">

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Account name"
            className="
              rounded-xl
              border
              border-neutral-700
              bg-neutral-800
              p-3
              outline-none
              focus:border-emerald-500
            "
          />

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as Account["type"]
              )
            }
            className="
              rounded-xl
              border
              border-neutral-700
              bg-neutral-800
              p-3
            "
          >
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="E-Wallet">
              E-Wallet
            </option>
            <option value="Crypto">
              Crypto
            </option>
            <option value="Investment">
              Investment
            </option>
          </select>

        </div>

        <button
          onClick={addAccount}
          className="
            mt-4
            rounded-xl
            bg-emerald-500
            px-5
            py-2
            font-semibold
            text-black
            transition
            hover:bg-emerald-400
          "
        >
          + Add Account
        </button>

      </div>

    </div>
  );
}