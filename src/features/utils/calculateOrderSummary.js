export const calculateOrderSummary = (items) => {
    const totalItems = items.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
    );

    const subTotalPrice = items.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const discountPercentage = 5;

    const discountAmount = (subTotalPrice * discountPercentage) / 100;

    const taxableAmount = subTotalPrice - discountAmount;

    const taxAmount = taxableAmount * 0.18;

    const totalPrice = Number(taxableAmount + taxAmount);

    return {
        totalItems,
        subTotalPrice,
        discountPercentage,
        discountAmount,
        taxAmount,
        totalPrice,
    };
};