import {config} from "../config/config";

class API {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${config.API_URL}`; // Zmień to na właściwy adres API
    }

    private async getAuthorizationHeader() {
        return {
            credentials: 'include',
            'Content-Type': 'application/json',
        };
    }

    public async getOrder(orderId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/order/${orderId}`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania zamówienia:', error);
            throw error;
        }
    }

    public async getAllOrders() {
        try {

            const response = await fetch(`${this.baseUrl}/order/list`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania wszystkich zamówień:', error);
            throw error;
        }
    }

    //REPORTS SECTION START

    public async getSalesReport() {
        try {
            const response = await fetch(`${this.baseUrl}/store/reports/sales`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania raportu:', error);
            throw error;
        }
    }

    //REPORTS SECTION END
}

export default new API();