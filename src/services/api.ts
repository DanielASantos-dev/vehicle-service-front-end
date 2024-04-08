import { FindAllVehicleRequest } from '@/types/findAllRequest';
import axiosInstance from './axiosService';
import { BaseResponse } from '@/types/baseResponse';
import { ResultAllVehicle, Vehicle } from '@/types/findAllVehicleResponse';
import { PatchVehicleRequest, RegisterVehicleRequest, UpdateVehicleRequest } from '@/types/requestsVehicle';


export async function fetchFindVehicle(params: FindAllVehicleRequest): Promise<BaseResponse<ResultAllVehicle> | null> {
    try {
        const validParams = Object.entries(params).reduce((acc, [key, value]) => {
            if (value != null && value !== "") acc[key as keyof FindAllVehicleRequest] = value;
            return acc;
        }, {} as FindAllVehicleRequest);

        const queryString = new URLSearchParams(validParams as any).toString();

        const baseUrl = `http://localhost:8080/api/v1/vehicles`.replace(/\/+$/, "");

        const url = `${baseUrl}?${queryString}`;
        console.log(url)

        const response = await axiosInstance.get<BaseResponse<ResultAllVehicle>>(url);
        console.log("End::fetchFindVehicle");
        return response.data;
    } catch (err: any) {
        console.error("ERRO::fetchFindVehicle", err);
        if (err.response) {
            console.log("Erro com resposta do servidor identificado", err.response);
            console.error("Erro capturado::fetchFindVehicle", err.response.data);
            return err.response.data;
        }
        return {
            success: false,
            error: {
                message: "Ocorreu um erro desconhecido",
                code: "000"
            }
        };
    }
}



export async function fetchFindVehicleById(id: number): Promise<BaseResponse<Vehicle> | null> {
    try {
        const response = await axiosInstance.get<BaseResponse<Vehicle>>(
            `/${id}`
        )
        console.log("End::fetchFindVehicleById")
        return response.data
    } catch (err: any) {
        console.error("ERRO::fetchFindVehicleById")
        if (err.response) {
            console.log("Erro com resposta do servidor identificado", err.response);
            console.error("Erro capturado::fetchFindVehicleById", err.response.data);
            return err.response.data;
        }
        console.error("Erro genérico::fetchFindVehicleById", err);
        return {
            success: false,
            error: {
                message: "Ocorreu um erro desconhecido",
                code: "000"
            }
        };
    }
}

export async function registerVehicle(request: RegisterVehicleRequest): Promise<BaseResponse<Vehicle> | null> {
    try {
        const response = await axiosInstance.post<BaseResponse<Vehicle>>("", request)
        console.log("End::registerVehicle")
        return response.data
    } catch (err: any) {
        console.error("ERRO::registerVehicle")
        if (err.response) {
            console.log("Erro com resposta do servidor identificado", err.response);
            console.error("Erro capturado::registerVehicle", err.response.data);
            return err.response.data;
        }
        console.error("Erro genérico::registerVehicle", err);
        return {
            success: false,
            error: {
                message: "Ocorreu um erro desconhecido",
                code: "000"
            }
        };
    }
}

export async function updateVehicle(id: number, request: UpdateVehicleRequest): Promise<BaseResponse<string> | null> {
    try {
        const response = await axiosInstance.put<BaseResponse<string>>(`${id}`, request)
        console.log("End::updateVehicle")
        return response.data
    } catch (err: any) {
        console.error("ERRO::updateVehicle")
        if (err.response) {
            console.log("Erro com resposta do servidor identificado", err.response);
            console.error("Erro capturado::updateVehicle", err.response.data);
            return err.response.data;
        }
        console.error("Erro genérico::updateVehicle", err);
        return {
            success: false,
            error: {
                message: "Ocorreu um erro desconhecido",
                code: "000"
            }
        };
    }
}

export async function pacthVehicle(id: number, request: PatchVehicleRequest): Promise<BaseResponse<string> | null> {
    try {
        const response = await axiosInstance.patch<BaseResponse<string>>(`${id}`, request)
        console.log("End::pacthVehicle")
        return response.data
    } catch (err: any) {
        console.error("ERRO::pacthVehicle")
        if (err.response) {
            console.log("Erro com resposta do servidor identificado", err.response);
            console.error("Erro capturado::pacthVehicle", err.response.data);
            return err.response.data;
        }
        console.error("Erro genérico::pacthVehicle", err);
        return {
            success: false,
            error: {
                message: "Ocorreu um erro desconhecido",
                code: "000"
            }
        };
    }
}

export async function deleteVehicle(id: number): Promise<BaseResponse<string> | null> {
    try {
        const response = await axiosInstance.delete<BaseResponse<string>>(`${id}`)
        console.log("End::deleteVehicle")
        return response.data
    } catch (err: any) {
        console.error("ERRO::deleteVehicle")
        if (err.response) {
            console.log("Erro com resposta do servidor identificado", err.response);
            console.error("Erro capturado::deleteVehicle", err.response.data);
            return err.response.data;
        }
        console.error("Erro genérico::deleteVehicle", err);
        return {
            success: false,
            error: {
                message: "Ocorreu um erro desconhecido",
                code: "000"
            }
        };
    }
}

