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

    public async changeOrderStatus(orderId: string, newStatus: string) {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: newStatus}),
            });

        } catch (error) {
            console.error('Błąd zmiany statusu zamówienia:', error);
            throw error;
        }
    }

    public async getLoggedInUser() {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/user`, {
                headers,
            });

        } catch (error) {
            console.error('Błąd pobierania zalogowanego użytkownika:', error);
            throw error;
        }
    }

    //REFUNDS SECTION START

    public async getAllRefunds() {
        try {

            const response = await fetch(`${this.baseUrl}/refund/list`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania wszystkich zamówień:', error);
            throw error;
        }
    }

    public async getRefund(refundId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/refund/${refundId}`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania zwrotu:', error);
            throw error;
        }
    }

    public async refreshFurgonetkaToken(): Promise<{ isSuccess: boolean; message: string; statusCode: number }> {
        try {
            const response = await fetch(`${this.baseUrl}/store/refresh/token`, {
                method: 'GET',
                credentials: 'include',
            });
    
            if (!response.ok) {
                throw new Error(`Błąd odnowienia tokenu: ${response.status}`);
            }
    
            const data = await response.json();
            return data; // Zwraca obiekt z `isSuccess`, `message` i `statusCode`
        } catch (error) {
            console.error('Błąd odnowienia tokenu Furgonetki:', error);
            throw error;
        }
    }

    public async refreshOrderStatus(): Promise<{ inTransit: any[]; delivered: any[] }> {
        try {
            const response = await fetch(`${this.baseUrl}/status/refresh/orders`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`1 Błąd odświeżania statusów zamówień: ${response.status}`);
            }

            const data = await response.json();
            return data; // Zwraca obiekt z `inTransit` i `delivered`
        } catch (error) {
            console.error('2 Błąd odświeżania statusów zamówień:', error);
            throw error;
        }
    }

    //REFUNDS SECTION END

    //REPORTS SECTION START

    public async getSalesReport() {
        try {
            const response = await fetch(`${this.baseUrl}/order/reports/sales`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania raportu:', error);
            throw error;
        }
    }

    public async getTopProductSalesReport() {
        try {
            const response = await fetch(`${this.baseUrl}/order/reports/topproducts`, {
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