import useAuthStore from "../store/authStore"

const useAuth = () => {
    const store = useAuthStore();
    return store
}

export default useAuth