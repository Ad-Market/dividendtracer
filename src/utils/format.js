export const formatAddress = (address, len) => {
    len = len || 6;
    return address.substring(0, len) + "..." + address.substring(address.length - len);
}