import { Vehicle } from "../types/findAllVehicleResponse";
import { fetchFindVehicle } from "../services/api";
import CardInfo from "./CardInfo";
import { useQuery } from "react-query";
import { getCarBrandNameByKey } from "../constants/CarBrand";

export default function Header() {

    const params = {

    };

    const { data, isLoading, error } = useQuery(['findVehicle', params], () =>
        fetchFindVehicle(params)
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
            <div className="mx-2 p-2 overflow-auto shadow-sm bg-white">
                <h2 className="text-sm  font-semibold text-center mb-1">Veículos por Década</h2>
                <ul>
                    {Object.entries(countByDecade).map(([decade, count]) => (
                        <li key={decade} className="border-t-[2px] border-gray-200">
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
            <div className="mx-2 p-2 overflow-auto shadow-sm bg-white">
                <h2 className="text-sm font-semibold text-center mb-1">Veículos por Marca</h2>
                <ul>
                    {Object.entries(countByBrand).map(([brand, count]) => (
                        <li key={brand} className="border-t-[2px] border-gray-200">
                            {getCarBrandNameByKey(brand)}: {count} veículo(s)
                        </li>
                    ))}
                </ul>
            </div>
        );
    }


    return (
        <div className="flex bg-[#F8F9FA] h-[100px] p-2 w-full justify-between">
            <div className="flex">
                <CardInfo title={"Veículos disponiveis"} value={`${vehicleAvailable()} veículo(s)` ?? '0 veículo(s)'} />
            </div>
            <div className="flex">
                {VehiclePerDecade()}
                {VehiclePerBrand()}
            </div>

        </div>
    )
}