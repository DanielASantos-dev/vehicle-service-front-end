export type RegisterVehicleRequest = {
    vehicleName: string;
    urlImg: string;
    brand: string;
    year: number;
    description: string;
    isSold: boolean;
};

export type UpdateVehicleRequest = {
    vehicleName: string;
    urlImg: string;
    brand: string;
    year: number;
    description: string;
    isSold: boolean;
};

export type PatchVehicleRequest = {
    vehicleName?: string;
    urlImg?: string;
    brand?: string;
    year?: number;
    description?: string;
    isSold: boolean;
};



