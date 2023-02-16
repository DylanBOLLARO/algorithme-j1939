import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import data from "../dataPGN.json";

function MyModal({ pgn }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 bg-zinc-700 w-20"
        >
          {pgn}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col w-full max-w-3xl transform overflow-hidden rounded-2xl bg-zinc-900 border-[1px] border-zinc-700 p-6 text-left align-middle shadow-xl transition-all gap-5">
                  <Dialog.Title
                    as="h3"
                    className="font-medium leading-6 text-zinc-200"
                  >
                    <div className="flex flex-wrap gap-3 text-[28px]">
                      <p className="text-blue-200">{pgn}</p>
                      <p>-</p>

                      {data[parseInt(pgn, 16)] ? (
                        <p>{data[parseInt(pgn, 16)].titre}</p>
                      ) : null}
                    </div>
                  </Dialog.Title>

                  {data[parseInt(pgn, 16)] ? (
                    <p className="text-[18px] text-zinc-400">
                      {data[parseInt(pgn, 16)].description}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap gap-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-[18px] font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      J'ai compris, merci !
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default MyModal;
