import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            profile: {
                name: "",
                email: "",
                phone: "",
                address: "",
            },
            updateProfile: (data) =>
                set((state) => ({
                    profile: {
                        ...state.profile,
                        ...data,
                    },
                })),
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuthStore;