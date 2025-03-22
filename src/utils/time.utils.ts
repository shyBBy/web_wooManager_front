export const formatDateToPolish = (dateString: string): string => {
    const date = new Date(dateString);

    const day = date.getDate(); // Dzień miesiąca
    const year = date.getFullYear(); // Rok
    const monthNames = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];

    const monthName = monthNames[date.getMonth()]; // Pobranie nazwy miesiąca

    return `${day} ${monthName} ${year}`;
};


