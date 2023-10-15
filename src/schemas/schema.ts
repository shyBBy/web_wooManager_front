import * as yup from 'yup';


export const loginSchema = yup.object().shape({
    email: yup.string().email(`E-mail musi zawierać w nazwie '@'`).required('E-mail jest wymagany.'),
    password: yup.string().min(2, `Hasło musi być dłuższe niż '8' znaków.`).required('Hasło jest wymagane.')
})

export const wpLoginSchema = yup.object().shape({
    username: yup.string().required('Nazwa użytkownika jest wymagana.'),
    password: yup.string().min(2, `Hasło musi być dłuższe niż '8' znaków.`).required('Hasło jest wymagane.')
})

export const activationSchema = yup.object().shape({
    email: yup.string().email(`E-mail musi zawierać w nazwie '@'`).required('E-mail jest wymagany.'),
    activationCode: yup.string().min(6, 'Kod aktywacyjny jest zbyt krótki').max(8, 'Kod aktywacyjny jest zbyt długi').required('Kod aktywacyjny jest wymagany')
})


export const createVehicleSchema = yup.object().shape({
    vehicleType: yup.string().oneOf(['Osobowy', 'Dostawczy', 'inny'], 'Niepoprawny typ pojazdu.').required('Typ pojazdu jest wymagany.'),
    name: yup.string().oneOf(['Mercedes', 'Renault', 'Opel', 'Nissan', 'Mazda', 'Porsche', 'Kia', 'Volkswagen', 'Ford', 'Inne'], 'Niepoprawna marka pojazdu.').required('Marka pojazdu jest wymagana.'),
    model: yup.string().oneOf(['Sprinter', 'Master', 'Ceed', 'Insignia', 'Golf', 'Koleos', 'Optima', 'Cayenne', 'Inne'], 'Niepoprawny model pojazdu.').required('Model pojazdu jest wymagany.'),
    registerNumber: yup.string().min(3, `Numer rejestracyjny musi posiadać minimum 3 znaki`).max(8, 'Maksymalna iloć znakow w numerze rejestracyjnym wynosi 8.').required('Numer rejestracyjny pojazdu jest wymagany.'),
    lastDateOfVehicleInspection: yup.date().required('Data ostatniego badania technicznego jest wymagana.'),
    nextDateOfVehicleInspection: yup.date().required('Data następnego badania technicznego jest wymagana.'),
    vinNumber: yup.string().min(16, `Vin jest zbyt krótki.`).max(18, 'Vin jest zbyt długi.').required('Numer VIN jest wymagany.'),
    yearOfProduction: yup.string().min(3, 'Rok jest niepoprawny.').max(5, 'Rok jest zbyt długi.').required('Rok produkcji jest wymagany.'),
    firstRegistrationDate: yup.string().min(3, 'Rok jest niepoprawny.').max(5, 'Rok jest zbyt długi.').required('Data pierwszej rejestracji jest wymagana.'),
    policyNumber: yup.string().required('Numer polisy jest wymagany.'),
    placeName: yup.string().oneOf(['Łódź', 'Warszawa', 'Lipno', 'Leszno', 'Lębork', 'Lublin', 'Kielce', 'Zabrze', 'Tarnów'], 'Niepoprawna nazwa oddziału firmy.').required('Nazwa oddziału jest wymagana.')
})

export const createStoreSchema = yup.object().shape({
    name: yup.string().required('Nazwa sklepu jest wymagana'),
    url: yup.string().required('Adres url jest wymagany'),
    consumer_key: yup.string().required('Klucz klienta jest wymagany'),
    consumer_secret: yup.string().required('Klucz sekretny jest wymagany')
})


export const addLastChangesSchema = yup.object().shape({
    title: yup.string().required('Tytuł jest wymagany'),
    description: yup.string().required('Opis wymagany')
})


export const AddVehicleTechnicalData = yup.object().shape({
    engineCapacity: yup.number(),
    enginePower: yup.number(),
    fuel: yup.string(),
    alternativeFuel: yup.number(),
    CO2Emission: yup.number(),
    avgFuelConsumption: yup.number(),
    totalSeats: yup.number(),
    seatedSeats: yup.number(),
    vehicleWeight: yup.number(),
    maxTrailerWeightWithBrakes: yup.number(),
    maxTrailerWeightWithoutBrakes: yup.number(),
    payload: yup.number(),
    grossWeight: yup.number(),
    numberOfAxles: yup.number(),
    axleSpacing: yup.number(),
    wheelSpacing: yup.number(),
    maxAxleLoad: yup.number(),
    vehicleWidth: yup.number(),
    vehicleLenght: yup.number(),
    vehicleHeight: yup.number(),
    cargoBedWidth: yup.number(),
    cargoBedLenght: yup.number(),
    cargoBedHeight: yup.number(),

})


export const UpdateUserDataSchema = yup.object().shape({
    name: yup.string().min(1, 'Nie możesz ustawić pustego pola.'),
    surname: yup.string().min(1, 'Nie możesz ustawić pustego pola.'),
    email: yup.string().email('Niepoprawny e-mail.').min(1, 'Nie możesz ustawić pustego pola.'),
    role: yup.string().oneOf(['Administrator', 'Użytkownik'], 'Niepoprawna nazwa grupy użytkownika'),
    jobPosition: yup.string().oneOf(['Magazynier', 'Kierownik', 'Dyrektor', 'Kierowca', 'Szef', 'Księgowa'], 'Niepoprawna nazwa stanowiska.'),
    isActive: yup.string().oneOf(['Aktywny', 'Nieaktywny'], 'Niepoprawny status konta'),
})


export const UploadUserAvatarSchema = yup.object().shape({

})

export const UploadVehicleAvatarSchema = yup.object().shape({

})