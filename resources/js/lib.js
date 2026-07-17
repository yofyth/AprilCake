export function formatRupiah(value) {
    const number = Number(value || 0);
    return 'Rp ' + number.toLocaleString('id-ID');
}

export function waLink(phoneNumber, message = '') {
    const digits = (phoneNumber || '').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(message);
    return `https://wa.me/${digits}${text ? `?text=${text}` : ''}`;
}
