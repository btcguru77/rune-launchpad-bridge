import { BitcoinNetworkType } from "sats-connect";
import { WalletContext } from "@/context/wallet";
import { useContext } from "react";
import { useBtcWalletData } from "@/store/hooks";

const BtcNetwork = () => {
  const wallet = useContext(WalletContext);
  const { network } = useBtcWalletData();

  const onNetworkChange = () => {
    const newNetwork =
      network === BitcoinNetworkType.Mainnet
        ? BitcoinNetworkType.Testnet
        : BitcoinNetworkType.Mainnet;

    wallet.btcNetworkSelector(newNetwork);
  };

  return (
    <div className="mt-4">
      <button
        className="w-full mb-2 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={() => onNetworkChange()}
      >
        Change Network: {network}
      </button>
    </div>
  );
};

export default BtcNetwork;
