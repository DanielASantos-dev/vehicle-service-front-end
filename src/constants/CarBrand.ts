export const CarBrand = {
    TOYOTA: "Toyota",
    FORD: "Ford",
    CHEVROLET: "Chevrolet",
    HONDA: "Honda",
    BMW: "BMW",
    MERCEDES: "Mercedes",
    TESLA: "Tesla",
    VOLKSWAGEN: "Volkswagen",
    AUDI: "Audi",
    HYUNDAI: "Hyundai",
    NISSAN: "Nissan",
    KIA: "Kia",
    VOLVO: "Volvo",
    JEEP: "Jeep",
    SUBARU: "Subaru",
    MAZDA: "Mazda",
    PORSCHE: "Porsche",
    LAND_ROVER: "Land Rover",
    LEXUS: "Lexus",
    INFINITI: "Infiniti",
    FIAT: "Fiat",
    MINI: "Mini",
    JAGUAR: "Jaguar",
    ALFA_ROMEO: "Alfa Romeo",
    MITSUBISHI: "Mitsubishi",
};

const carBrandEntries = Object.entries(CarBrand).map(([key, value]) => ({ key, value }));
export const sortedCarBrandEntries = carBrandEntries.sort((a, b) => a.value.localeCompare(b.value));


export function getCarBrandNameByKey(key: string): string | undefined {
    return CarBrand[key as keyof typeof CarBrand];
}