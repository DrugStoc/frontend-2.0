export const priceFormat = (num) => {
    return '₦ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const priceFormatDecimal = (num=0) => {
    return '₦ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};