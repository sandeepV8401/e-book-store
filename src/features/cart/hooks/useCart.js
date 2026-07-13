
import useCartStore from "../store/cartStore"

const useCart = () => {

    const store = useCartStore()

    return store;
}
export default useCart;