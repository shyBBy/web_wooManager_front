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


export const getStatusColor = (status: string | any) => {
    switch (status) {
        case "Zaakceptowany":
            return 'success';
        case "Odrzucony":
            return 'error';
        default:
            return 'white';
    }
};