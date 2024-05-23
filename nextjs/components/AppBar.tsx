import React, { forwardRef, useContext, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Button,
} from "@headlessui/react";
import Link from "next/link";
import { useBtcAddress } from "@/store/hooks";
import toast from "react-hot-toast";
import BtcNetwork from "./BtcNetwork";
import { WalletContext } from "@/context/wallet";
import { addressFormat, copyToClipboard } from "@/utils";

const AppBar = () => {
  const wallet = useContext(WalletContext);
  const [btcDialog, setBtcDialog] = useState(false);
  const { taproot } = useBtcAddress();

  return (
    <>
      <div className="flex justify-center px-2">
        <div
          className={`flex justify-between bg-white items-center fixed top-0 left-1/2 -translate-x-1/2 z-40 px-3 rounded-none w-full`}
        >
          <div className="text-right flex px-2 items-center">
            <Link
              href="/"
              className="flex justify-center items-center text-xl font-bold mr-5"
            >
              <img
                src="/favicon.ico"
                alt="favicon"
                className="sm:w-[45px] w-[35px] rounded-md my-2 mx-3"
              />
              RunesBridgeAlpha
            </Link>
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md border-black/5 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-black/5 data-[focus]:outline-1 data-[focus]:outline-black">
                Runes
              </MenuButton>
              <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems
                  anchor="bottom start"
                  className="z-50 origin-top-right rounded-xl border border-black/5 bg-black/5 p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none"
                >
                  <MenuItem>
                    <Link
                      href={"/runes/etch"}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                    >
                      Etch
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href={"/runes/mint"}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                    >
                      Mint
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href={"/runes/transfer"}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                    >
                      Transfer
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
          <div className="text-right">
            <Menu>
              <MenuButton
                onClick={!taproot ? () => setBtcDialog(true) : null}
                className="inline-flex items-center gap-2 rounded-s-xl bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {taproot ? addressFormat(taproot) : "Connect BTC"}
              </MenuButton>

              {taproot ? (
                <>
                  <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <MenuItems
                      anchor="bottom end"
                      className="w-36 origin-top-right rounded-xl border border-black/5 bg-gray-200 p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none z-50"
                    >
                      <MenuItem>
                        <Button
                          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                          onClick={() => {
                            copyToClipboard(taproot as string);
                            toast.success("copied");
                          }}
                        >
                          {addressFormat(taproot)}
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                          onClick={async () => {
                            wallet.DisconnectWallet();
                          }}
                        >
                          Disconnect
                        </Button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </>
              ) : null}
            </Menu>
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-e-xl bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Connect ETH
              </MenuButton>
              <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems
                  anchor="bottom end"
                  className="w-36 origin-top-right rounded-xl border border-black/5 bg-gray-200 p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none z-50"
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                      0x18a6c1...e27ba
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                      Disconnect
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      <Transition appear show={btcDialog}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none text-center"
          onClose={() => setBtcDialog(false)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    Bticoin Wallet
                  </DialogTitle>
                  <BtcNetwork />
                  <div className="mt-4">
                    <Button
                      className="w-full mb-2 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={async () => {
                        wallet.XverseWalletConnect();
                        setBtcDialog(false);
                      }}
                    >
                      <img
                        src={"/assets/wallet/xverse.jpg"}
                        alt=""
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "5px",
                        }}
                      />{" "}
                      Xverse
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Button
                      className="w-full mb-2 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={() => setBtcDialog(false)}
                    >
                      <img
                        src={"/assets/wallet/unisat.jpg"}
                        alt=""
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "5px",
                        }}
                      />{" "}
                      Unisat
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AppBar;
