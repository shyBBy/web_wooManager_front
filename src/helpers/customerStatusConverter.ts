export const CustomerStatusConverter = (status: string) => {
    switch (status) {
        case "approved":
            return "Zaakceptowany";
        case "pending":
            return "Oczekujący";
        case "denied":
            return "Odrzucony";
        default:
            return status
    }

}