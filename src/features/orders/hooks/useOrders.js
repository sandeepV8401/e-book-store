import useOrderStore from "../store/orderStore";

const useOrders = () => {

    const store = useOrderStore()

    return store;
}
export default useOrders;