import { fetchFindVehicle } from "../services/api";
import CardInfo from "./CardInfo";
import { useQuery } from "react-query";

export default function Header() {

    const { data, isLoading, error } = useQuery(['findVehicleHeader'], () =>
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

    return (
        <div className="flex bg-[#F8F9FA] h-[100px] p-2 w-full justify-between">
            <div className="flex">
                <CardInfo title={"Veículos disponiveis"} value={`${vehicleAvailable()} veículo(s)` ?? '0 veículo(s)'} />
            </div>
        </div>
    )
}