import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(

    persist((set) => ({
        orders: [],

        placeOrder: (order) =>
            set((state) => ({
                orders: [...state.orders, order],
            })),

    }),
        {
            name: "order-storage", // LocalStorage key
        }

    )

);

export default useOrderStore;