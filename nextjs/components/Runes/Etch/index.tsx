import { useBtcAddress, useBtcWalletData } from "@/store/hooks";
import { useState, useContext } from "react";
import Wallet, { BitcoinNetworkType } from "sats-connect";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import clsx from "clsx";
import FeeRatePad from "@/components/FeeRatePad";
import { convert2RunesName } from "@/utils";
// import { WalletContext } from "@/context/wallet";
import toast from "react-hot-toast";

const EtchRunes = () => {
  // const wallet = useContext(WalletContext);
  const { taproot, nestedsegwit } = useBtcAddress();
  const { network } = useBtcWalletData();

  const [loading, setLoading] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>();
  const [totalSize, setTotalSize] = useState<number>();
  const [fundTxId, setFundTxId] = useState<string>("");
  const [runeName, setRuneName] = useState<string>("");
  const [feeRate, setFeeRate] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [preMine, setPreMine] = useState<string>("");
  const [divisibility, setDivisibility] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [mintCap, setMintCap] = useState<string>("");
  const [blockLimit, setBlockLimit] = useState<boolean>(false);
  const [startBlock, setStartBlock] = useState<string>("");
  const [endBlock, setEndBlock] = useState<string>("");
  const [destinationAddress, setDestinationAddress] = useState<string>(taproot);

  const handleTotalSupply = () => {
    const p = preMine === "" ? 0 : parseInt(preMine),
      m = mintCap === "" ? 0 : parseInt(mintCap),
      a = amount === "" ? 0 : parseInt(amount);
    return p + m * a;
  };

  const isRunesName = (value: string) => value.replace(/\s/, "").length > 13;

  const onClickEstimate = async () => {
    setLoading(true);
    if (taproot === "") {
      // wallet.XverseWalletConnect();
      toast.error("Please connect your wallet.");
      setLoading(false);
      return;
    }
    if (!isRunesName(runeName)) {
      return;
    }
    const response = await Wallet.request("runes_estimateEtch", {
      destinationAddress: destinationAddress,
      feeRate: +feeRate,
      symbol: symbol || undefined,
      premine: preMine || undefined,
      divisibility: +divisibility || undefined,
      terms:
        amount || mintCap
          ? {
              amount: amount || undefined,
              cap: mintCap || undefined,
              heightStart: startBlock || undefined,
              heightEnd: endBlock || undefined,
            }
          : undefined,
      isMintable: true,
      runeName: runeName,
      network: network,
    });
    setLoading(false);

    if (response.status === "success") {
      console.log({ response });

      setTotalCost(response.result.totalCost);
      setTotalSize(response.result.totalSize);
    } else {
      console.error(response.error);
      // alert("Error Fetching Estimate. See console for details.");
      toast.error("Error Fetching Estimate. See console for details.");
    }
  };

  const onClickExecute = async () => {
    setLoading(true);
    if (taproot === "") {
      // wallet.XverseWalletConnect();
      toast.error("Please connect your wallet.");
      setLoading(false);
      return;
    }
    if (!isRunesName(runeName)) {
      return;
    }
    const response = await Wallet.request("runes_etch", {
      destinationAddress: destinationAddress,
      symbol: symbol || undefined,
      premine: preMine || undefined,
      terms:
        amount || mintCap
          ? {
              amount: amount || undefined,
              cap: mintCap || undefined,
              heightStart: startBlock || undefined,
              heightEnd: endBlock || undefined,
            }
          : undefined,
      feeRate: +feeRate,
      isMintable: true,
      runeName,
      refundAddress: nestedsegwit,
      network,
    });
    setLoading(false);
    if (response.status === "success") {
      setFundTxId(response.result.fundTransactionId);
    } else {
      console.error(response.error);
      // alert("Error sending BTC. See console for details.");
      toast.error("Error Fetching Estimate. See console for details.");
    }
  };

  const fundTxLink =
    network === BitcoinNetworkType.Mainnet
      ? `https://mempool.space/tx/${fundTxId}`
      : `https://mempool.space/testnet/tx/${fundTxId}`;

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
            <Label className="text-sm/6 font-medium text-red-500">Symbol</Label>
            <Input
              required={true}
              value={symbol}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSymbol(e.currentTarget.value.slice(-1))
              }
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-red-500">
              Divisibility
            </Label>
            <Input
              type="number"
              required={true}
              value={divisibility}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDivisibility(e.currentTarget.value)
              }
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          {blockLimit ? (
            <div className="w-full flex inline-flex justify-between">
              <Field>
                <Label className="text-sm/6 font-medium text-black">
                  Start block
                </Label>
                <Input
                  type="number"
                  value={startBlock}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStartBlock(e.currentTarget.value)
                  }
                  className={clsx(
                    "mt-3 block w-full/2 rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>
              <Field>
                <Label className="text-sm/6 font-medium text-black">
                  End block
                </Label>
                <Input
                  type="number"
                  value={endBlock}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEndBlock(e.currentTarget.value)
                  }
                  className={clsx(
                    "mt-3 block w-full/2 rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                />
              </Field>
            </div>
          ) : null}

          <Field>
            <Label className="text-sm/6 font-medium text-red-500">
              Mint Cap
            </Label>
            <Input
              type="number"
              required={true}
              value={mintCap}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMintCap(e.currentTarget.value)
              }
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-red-500">
              Amount Per Mint
            </Label>
            <Input
              type="number"
              required={true}
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.currentTarget.value)
              }
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-red-500">
              Premine
            </Label>
            <Input
              type="number"
              required={true}
              value={preMine}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPreMine(e.currentTarget.value)
              }
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Total Supply
            </Label>
            <Input
              type="number"
              value={handleTotalSupply()}
              disabled={true}
              className={clsx(
                "data-[disabled]:bg-black/5 mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Receiver Address
            </Label>
            <Input
              value={destinationAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDestinationAddress(e.currentTarget.value)
              }
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={blockLimit}
                onChange={() => setBlockLimit(!blockLimit)}
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
              >
                Block Limit
              </label>
            </div>
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

export default EtchRunes;
