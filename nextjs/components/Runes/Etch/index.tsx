import { useBtcAddress, useBtcWalletData } from "@/store/hooks";
import { useMemo, useState } from "react";
import Wallet, {
  Address,
  AddressPurpose,
  BitcoinNetworkType,
} from "sats-connect";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import FeeRatePad from "../FeeRatePad";

const EtchRunes = () => {
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

  const { taproot, nestedsegwit } = useBtcAddress();
  const { network } = useBtcWalletData();

  const onClickEstimate = async () => {
    const response = await Wallet.request("runes_estimateEtch", {
      destinationAddress: taproot,
      feeRate: +feeRate,
      symbol: symbol || undefined,
      premine: preMine || undefined,
      divisibility: +divisibility || undefined,
      terms:
        amount || mintCap
          ? {
              amount: amount || undefined,
              cap: mintCap || undefined,
            }
          : undefined,
      isMintable: true,
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
    const response = await Wallet.request("runes_etch", {
      destinationAddress: taproot,
      symbol: symbol || undefined,
      premine: preMine || undefined,
      terms:
        amount || mintCap
          ? {
              amount: amount || undefined,
              cap: mintCap || undefined,
            }
          : undefined,
      feeRate: +feeRate,
      isMintable: true,
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
      : `https://mempool.space/testnet/tx/${fundTxId}`;

  return (
    <>
      <div className="w-full max-w-lg px-2">
        <Fieldset className="space-y-6 rounded-xl bg-black/5 p-6 sm:p-10">
          <Legend className="text-base/7 font-semibold text-black">
            Etching a Rune token
          </Legend>
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Rune Ticker
            </Label>
            <Input
              required={true}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">Symbol</Label>
            <Input
              required={true}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Divisibility
            </Label>
            <Input
              type="number"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          {/* <Field>
            <Label className="text-sm/6 font-medium text-black">
              Start block
            </Label>
            <Input
              type="number"

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
              className={clsx(
                "mt-3 block w-full/2 rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field> */}
          <Field>
            <Label className="text-sm/6 font-medium text-black">Cap</Label>
            <Input
              type="number"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Limit Per Mint
            </Label>
            <Input
              type="number"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">Premine</Label>
            <Input
              type="number"
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
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-black">
              Receiver Address
            </Label>
            <Input
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
            <Button className="text-center w-full rounded-xl bg-fuchsia-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-fuchsia-800 data-[open]:bg-fuchsia-800 data-[focus]:outline-1 data-[focus]:outline-white">
              Etching Runes
            </Button>
          </Field>
        </Fieldset>
      </div>
      {/* <div className="card">
        <h3>Etch Runes</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingRight: 100,
            marginBottom: 20,
          }}
        >
          <div>
            <h4>Rune Name</h4>
            <input
              type="text"
              value={runeName}
              onChange={(e) => setRuneName(e.target.value)}
            />
          </div>
          <div>
            <h4>Symbol</h4>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div>
            <h4>Divisibility</h4>
            <input
              type="number"
              value={divisibility}
              onChange={(e) => setDivisibility(e.target.value)}
            />
          </div>
          <div>
            <h4>Premine</h4>
            <input
              type="number"
              value={preMine}
              onChange={(e) => setPreMine(e.target.value)}
            />
          </div>
          <div>
            <h4>Amount</h4>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <h4>Mint Cap</h4>
            <input
              type="number"
              value={mintCap}
              onChange={(e) => setMintCap(e.target.value)}
            />
          </div>
          <div>
            <h4>feeRate (sats/vb)</h4>
            <input
              type="number"
              value={feeRate}
              onChange={(e) => setFeeRate(e.target.value)}
            />
          </div>
        </div>

        <button onClick={onClickEstimate} disabled={!runeName || !feeRate}>
          Estimate Etch
        </button>
      </div>

      {totalCost && (
        <div className="card">
          <div>
            <h3>Rune Name</h3>
            <p className="success">{runeName}</p>
          </div>
          <div>
            <h3>Total Cost (sats) - Total Size</h3>
            <p className="success">
              {totalCost} - {totalSize}
            </p>
          </div>
          <button onClick={onClickExecute}>Execute Etch</button>
          {fundTxId && (
            <div className="success">
              Success! Click{" "}
              <a href={fundTxLink} target="_blank" rel="noreferrer">
                here
              </a>{" "}
              to see your transaction
            </div>
          )}
        </div>
      )} */}
    </>
  );
};

export default EtchRunes;
