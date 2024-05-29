import { useBtcAddress, useBtcWalletData } from "@/store/hooks";
import { convert2RunesName } from "@/utils";
import {
  Field,
  Fieldset,
  Label,
  Legend,
  Input,
  Button,
} from "@headlessui/react";
import { useMemo, useState } from "react";
import Wallet, {
  Address,
  AddressPurpose,
  BitcoinNetworkType,
} from "sats-connect";
import clsx from "clsx";
import FeeRatePad from "@/components/FeeRatePad";

const MintRunes = () => {
  const { taproot, nestedsegwit } = useBtcAddress();
  const { network } = useBtcWalletData();

  const [totalCost, setTotalCost] = useState<number>();
  const [totalSize, setTotalSize] = useState<number>();
  const [fundTxId, setFundTxId] = useState<string>("");
  const [runeName, setRuneName] = useState<string>("");
  const [feeRate, setFeeRate] = useState<string>("");
  const [repeats, setRepeats] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onClickEstimate = async () => {
    const response = await Wallet.request("runes_estimateMint", {
      destinationAddress: taproot,
      feeRate: +feeRate,
      repeats: +repeats,
      runeName: runeName,
      network: network,
    });

    if (response.status === "success") {
      setTotalCost(response.result.totalCost);
      setTotalSize(response.result.totalSize);
    } else {
      console.error(response.error);
      alert("Error Fetching Estimate. See console for details.");
    }
  };

  const onClickExecute = async () => {
    const response = await Wallet.request("runes_mint", {
      destinationAddress: taproot,
      feeRate: +feeRate,
      repeats: +repeats,
      runeName,
      refundAddress: nestedsegwit,
      network,
    });

    if (response.status === "success") {
      setFundTxId(response.result.fundTransactionId);
    } else {
      console.error(response.error);
      alert("Error sending BTC. See console for details.");
    }
  };

  const fundTxLink =
    network === BitcoinNetworkType.Mainnet
      ? `https://mempool.space/tx/${fundTxId}`
      : `https://mempool.space/testnet4/tx/${fundTxId}`;
  return (
    <>
      <div className="w-full max-w-lg px-2">
        <Fieldset className="space-y-6 rounded-xl bg-black/5 p-6 sm:p-10">
          <Legend className="text-base/7 font-semibold text-black">
            Etching a Rune token
          </Legend>
          <Field>
            <Label className="text-sm/6 font-medium text-red-500">
              Rune Ticker
            </Label>
            <Input
              required={true}
              value={runeName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRuneName(convert2RunesName(e.currentTarget.value));
              }}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-red-500">
              Repeat
            </Label>
            <Input
              type="number"
              required={true}
              value={repeats}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRepeats(e.currentTarget.value)
              }
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <FeeRatePad setFeeOption={setFeeRate} />
          </Field>
          <Field>
            <Button
              disabled={!runeName || !feeRate}
              onClick={
                totalCost && totalSize
                  ? () => onClickExecute()
                  : () => onClickEstimate()
              }
              className={`flex justify-center text-center w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none rounded-xl bg-fuchsia-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-fuchsia-800 data-[open]:bg-fuchsia-800 data-[focus]:outline-1 data-[focus]:outline-white`}
            >
              {loading
                ? "Loading..."
                : totalCost && totalSize
                ? "Etching Runes"
                : "Estimate Etching Runes"}
            </Button>
          </Field>
          {totalCost && totalSize && (
            <div
              className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded-xl"
              role="alert"
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
              </svg>
              <p>
                It will cost <kbd>{totalCost}</kbd> and size will be{" "}
                <kbd>{totalSize}</kbd>.
              </p>
            </div>
          )}
          {fundTxId && (
            <div
              className="flex items-center bg-rose-500 text-white text-sm font-bold px-4 py-3 rounded-xl"
              role="alert"
            >
              Success! Click{" "}
              <a href={fundTxLink} target="_blank" rel="noreferrer">
                here
              </a>{" "}
              to see your transaction
            </div>
          )}
        </Fieldset>
      </div>
    </>
  );
};

export default MintRunes;
