import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@nextui-org/react';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { isOpen, title, description, confirmText = 'Confirm', onCancel, onConfirm } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90" />
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
              <Dialog.Panel className="w-full max-w-2xl bg-white transform overflow-hidden rounded-[32px] px-8 py-10 text-left align-middle shadow-xl transition-all">
                <h3 className="text-2xl mb-8">{title}</h3>
                <p className="font-light">{description}</p>

                <div className="w-full flex justify-end gap-4 mt-8">
                  <Button className="rounded-full" type="button" variant="light" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    className="rounded-full"
                    color="primary"
                    type="button"
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmDialog;
