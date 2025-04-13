import { WooCommerceOrderResponse } from "./WooCommerceOrder";

// Główna odpowiedź z API backendu
export interface GetOneOrderResponse {
    order: WooCommerceOrderResponse; // Obiekt zamówienia z WooCommerce
    shipping: ShippingInterface | null; // Szczegóły wysyłki (własne)
    shipping_tracking: ShippingTrackingInterface | null; // Informacje o śledzeniu przesyłki
}

// Szczegóły wysyłki (własne)
export interface ShippingInterface {
    package_id: string; // ID paczki
    group_id: string | null; // ID grupy paczek (jeśli istnieje)
    pickup: PickupInterface; // Szczegóły punktu odbioru
    sender: SenderReceiverInterface; // Szczegóły nadawcy
    receiver: SenderReceiverInterface; // Szczegóły odbiorcy
    parcels: ParcelInterface[]; // Lista paczek
    additional_services: AdditionalServicesInterface; // Dodatkowe usługi
    type: string; // Typ przesyłki
    pricing: PricingInterface; // Szczegóły cenowe
    service: string; // Usługa kurierska (np. "dpd")
    transport_service: string; // Usługa transportowa
    transport_service_description: string | null; // Opis usługi transportowej
    service_id: number; // ID usługi
    state: string; // Stan przesyłki (np. "ordered", "delivered")
    service_contract: string; // Kontrakt na usługę
    cancel_available: boolean; // Czy można anulować przesyłkę
    complaint_available: boolean; // Czy można złożyć reklamację
    cancel_details: CancelDetailsInterface; // Szczegóły anulowania
    edit_url: string | null; // URL do edycji przesyłki
    documents_url: string; // URL do dokumentów przesyłki
    add_similar_url: string; // URL do dodania podobnej przesyłki
    repickup: boolean; // Czy możliwy jest ponowny odbiór
    pickup_available: boolean; // Czy możliwy jest odbiór
    name: string; // Nazwa odbiorcy
    pickup_number: string | null; // Numer odbioru
    label: LabelInterface; // Szczegóły etykiety
    documents: DocumentInterface[]; // Lista dokumentów
    pickup_date: string | null; // Data odbioru
    datetime_order: string; // Data zamówienia
    datetime_add: string; // Data dodania przesyłki
    datetime_delivery: string; // Data dostarczenia przesyłki
    delivery_time: string; // Czas dostawy
}

// Informacje o śledzeniu przesyłki
export interface ShippingTrackingInterface {
    tracking: TrackingEventInterface[]; // Lista wydarzeń śledzenia
}

// Wydarzenie śledzenia przesyłki
export interface TrackingEventInterface {
    state: string; // Stan przesyłki (np. "delivered", "transit")
    status: string; // Status przesyłki (np. "Przesyłka doręczona")
    datetime: string; // Data i czas wydarzenia
    branch: string; // Oddział, w którym miało miejsce wydarzenie
}

// Szczegóły punktu odbioru
export interface PickupInterface {
    name: string; // Nazwa punktu odbioru
    company: string; // Firma
    street: string; // Ulica
    postcode: string; // Kod pocztowy
    city: string; // Miasto
    country_code: string; // Kod kraju
    county: string | null; // Powiat
    email: string; // Email
    phone: string; // Telefon
    point: string; // Punkt odbioru
    point_label: string; // Etykieta punktu odbioru
    point_data: PointDataInterface; // Szczegóły punktu odbioru
}

// Szczegóły nadawcy/odbiorcy
export interface SenderReceiverInterface {
    uuid?: string | null; // UUID
    name: string; // Imię i nazwisko
    company: string | null; // Firma
    street: string; // Ulica
    postcode: string; // Kod pocztowy
    city: string; // Miasto
    country_code: string; // Kod kraju
    county: string | null; // Powiat
    email: string; // Email
    phone: string; // Telefon
    point?: string | null; // Punkt odbioru
    point_data?: PointDataInterface | null; // Szczegóły punktu odbioru
    point_label?: string | null; // Etykieta punktu odbioru
}

// Szczegóły paczki
export interface ParcelInterface {
    package_no: string; // Numer paczki
    description: string; // Opis paczki
    state_description: string; // Opis stanu paczki
    state: string; // Stan paczki
    station: string | null; // Stacja
    width: number; // Szerokość
    depth: number; // Głębokość
    height: number; // Wysokość
    weight: number; // Waga
    dimensional_weight: number | null; // Waga wymiarowa
    pallet_info: string | null; // Informacje o palecie
    value: number; // Wartość paczki
    tracking_url: string; // URL do śledzenia paczki
    service: string; // Usługa kurierska
    delivery_time: number; // Czas dostawy
    gauge: string | null; // Rozmiar
    datetime_status: string; // Data i czas statusu
}

// Dodatkowe usługi
export interface AdditionalServicesInterface {
    cod?: CodInterface; // Pobranie przy odbiorze
    rod?: boolean; // Zwrot dokumentów
    cud?: boolean; // Zwrot potwierdzenia odbioru
    private_shipping?: boolean; // Prywatna wysyłka
    // inne właściwości...
}

// Szczegóły pobrania przy odbiorze
export interface CodInterface {
    amount: number; // Kwota pobrania
    currency: string; // Waluta
    express: boolean; // Czy pobranie jest ekspresowe
    iban: string; // Numer IBAN
    name: string; // Nazwa odbiorcy
    swift: string; // Kod SWIFT
    transferDone: boolean; // Czy przelew został wykonany
    transferDateInfo: string; // Data przelewu
    transferStatus: string | null; // Status przelewu
}

// Szczegóły punktu odbioru
export interface PointDataInterface {
    code: string; // Kod punktu
    name: string; // Nazwa punktu
    active: boolean; // Czy punkt jest aktywny
    opening_hours: Record<string, { start_hour: string; end_hour: string }>; // Godziny otwarcia
    coordinates: { latitude: number; longitude: number }; // Współrzędne
    description: string; // Opis punktu
}

// Szczegóły anulowania przesyłki
export interface CancelDetailsInterface {
    available: boolean; // Czy anulowanie jest dostępne
    cancellation_done: boolean; // Czy anulowanie zostało wykonane
    cancellation_date: string | null; // Data anulowania
}

// Szczegóły etykiety
export interface LabelInterface {
    file_format: string; // Format pliku etykiety (np. "pdf")
}

// Szczegóły dokumentu
export interface DocumentInterface {
    type: string; // Typ dokumentu (np. "labels")
    format: string; // Format dokumentu (np. "pdfa6")
    details: any; // Szczegóły dokumentu
}

// Szczegóły cenowe
export interface PricingInterface {
    price_gross: number; // Cena brutto
    price_net: number; // Cena netto
    tax: number; // Podatek
    details: Array<{ service: string; price_net: number; description: string }>; // Szczegóły cenowe
}


export enum OrderStatus {
    ALL = "all",
    SENT = "in-transit",
    IN_PROGRESS = "processing",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export enum OrderStatusColor {
    PENDING = "#ffd166",
    PROCESSING = "#b3c7d6",
    ON_HOLD = "#ffb380",
    COMPLETED = "#679a75",
    CANCELLED = "#780000",
    REFUNDED = "#d6b3d6",
    FAILED = "#3f3f3f",
    IN_TRANSIT = "#be913d",
    TRASH = "black",
    DEFAULT = "gray",
}