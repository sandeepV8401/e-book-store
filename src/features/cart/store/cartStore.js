import { create } from "zustand"
import { persist } from "zustand/middleware";

const useCartStore = create(


    persist((set) => ({
        cartItems: [],
        checkOutItems: [],



        // fetchCart: async () => {

        // },

        addToCart: (book) =>
            set((state) => {
                const exists = state.cartItems.find((item) => item.id === book.id);

                if (exists) return state;

                return {
                    cartItems: [
                        ...state.cartItems,
                        {
                            ...book,
                            quantity: 1,
                        },
                    ],
                };
            }),

        updateCart: (id, type) =>
            set((state) => ({
                cartItems: state.cartItems.map((item) => {
                    if (item.id !== id) return item;

                    if (type === "inc" && item.quantity < item.stock) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }

                    if (type === "dec" && item.quantity > 1) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }

                    return item;
                }),
            })),


        removeFromCart: (id) => set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

        clearCart: () => set({
            cartItems: [],
        }),

        setCheckOutItems: (items) =>
            set({
                checkOutItems: items,
            }),

    }),
        {
            name: "cart-storage", // LocalStorage key
        }

    ))

export default useCartStore;