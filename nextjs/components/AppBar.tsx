import React, { Fragment, useContext, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";

const AppBar = () => {
  return (
    <>
      <div className="flex justify-center px-2">
        <div
          className={`flex justify-between bg-white items-center fixed top-0 left-1/2 -translate-x-1/2 z-40 px-3 rounded-none w-full`}
        >
          <Link href="/">
            <img
              src="/favicon.ico"
              alt="favicon"
              className="sm:w-[45px] w-[35px] rounded-md my-2 ml-1"
            />
          </Link>
          <div className="text-right">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Connect BTC
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
                      bc18a6c1...e27ba
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
    </>
  );
};

export default AppBar;
