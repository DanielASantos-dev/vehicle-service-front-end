import React from 'react';
import { getCarBrandNameByKey } from "../constants/CarBrand";
import { fetchFindVehicle } from '../services/api';
import { useQuery } from 'react-query';
import { Vehicle } from '../types/findAllVehicleResponse';


export default function SidBarRight() {
    const { data, isLoading, error } = useQuery(['findVehicleSidBarRight'], () =>
        fetchFindVehicle({})
            .then(response => {
                console.log("Dados recebidos:", response);
                return response;
            })
            .catch(err => {
                console.error("Erro na busca:", err);
                throw err;
            }),
    );

    function vehicleAvailable() {
        return data?.result?.content.filter(vehicle => vehicle.sold === false).length.toString()
    }

    function VehiclePerDecade() {
        if (!data || !data.result || !data.result.content) {
            return <div>Carregando dados ou Dados não disponíveis.</div>;
        }

        const countByDecade: Record<string, number> = {};

        data.result.content.forEach((vehicle: Vehicle) => {
            const decade = `${Math.floor(vehicle.year / 10) * 10}`;
            if (!countByDecade[decade]) {
                countByDecade[decade] = 0;
            }
            countByDecade[decade]++;
        });

        return (
            <div className=" p-2 overflow-auto shadow-sm bg-white mx-4">
                <h2 className="text-sm  font-semibold text-start mb-1">Veículos por Década</h2>
                <ul className='mt-2 list-disc list-inside w-36 text-sm'>
                    {Object.entries(countByDecade).map(([decade, count]) => (
                        <li key={decade} className="text-[0.75rem] mb-1">
                            {decade}: {count} veículo(s)
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    function VehiclePerBrand() {
        if (!data || !data.result || !data.result.content) {
            return <div>Carregando dados ou Dados não disponíveis.</div>;
        }

        const countByBrand: Record<string, number> = {};

        data.result.content.forEach((vehicle: Vehicle) => {
            const { brand } = vehicle;
            if (!countByBrand[brand]) {
                countByBrand[brand] = 0;
            }
            countByBrand[brand]++;
        });

        return (
            <div className="p-2 overflow-auto shadow-sm bg-white">
                <h2 className="text-sm font-semibold text-start mb-1">Veículos por Marca</h2>
                <ul className='mt-2 list-disc list-inside w-40 ]'>
                    {Object.entries(countByBrand).map(([brand, count]) => (
                        <li key={brand} className=" border-gray-200 text-[0.75rem] mb-1">
                            {getCarBrandNameByKey(brand)}: {count} veículo(s)
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className={`h-screen ml-1 bg-[#F8F9FA] my-5`}>
            <div className="flex">
                {VehiclePerBrand()}
                {VehiclePerDecade()}
            </div>
        </div>
    );
}
