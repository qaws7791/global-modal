import { create } from "zustand";

import { StoreApi, UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

interface Modal {
  isOpen: boolean;
}

interface ModalState {
  modals: Record<string, Modal>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string, value: boolean) => void;
  // isModalOpen: (modalId: string) => boolean;
}

const useModalStoreBase = create<ModalState>()(
  devtools((set) => ({
    modals: {},
    openModal: (modalId) => {
      set((state) => ({
        modals: { ...state.modals, [modalId]: { isOpen: true } },
      }));
    },
    closeModal: (modalId) => {
      set((state) => {
        const modal = state.modals[modalId];
        if (modal) {
          const modals = { ...state.modals };
          delete modals[modalId];
          return { modals };
        }
        return state;
      });
    },
  }))
);

const useModalStore = createSelectors(useModalStoreBase);

export default useModalStore;

export const isModalOpen = (modalId: string) => {
  const modals = useModalStore.use.modals();
  return !!modals[modalId];
};
