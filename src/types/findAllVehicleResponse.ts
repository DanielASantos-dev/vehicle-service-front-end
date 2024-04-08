export interface ResultAllVehicle {
    content: Vehicle[];
    totalElements: number;
    totalPages: number;
    pageable: Pageable;
}

export interface Vehicle {
    id: number;
    vehicleName: string;
    brand: string;
    year: number;
    description: string;
    urlImg: string;
    createdAt: string;
    updatedAt: string;
    sold: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    direction: string;
}