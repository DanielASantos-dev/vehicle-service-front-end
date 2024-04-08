export type FindAllVehicleRequest = {
    page?: number;
    size?: number;
    sort?: 'asc' | 'desc';
    vehicleName?: string;
    year?: number | null;
    brand?: string;
    isSold?: boolean | null;
    starTime?: string;
    endTime?: string;
};
