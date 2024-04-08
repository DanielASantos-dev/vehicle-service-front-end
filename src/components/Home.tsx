import CardCar from "./CardCar";
import { useQuery } from 'react-query';
import { formatDate, getDateNDaysBefore } from "../functions/utils";
import { fetchFindVehicle } from "../services/api";

export default function Home() {
    const params = {
        startTime: formatDate(getDateNDaysBefore(7)),
        endTime: formatDate(new Date()),
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

    if (isLoading) return <div>Carregando...</div>;

    if (error) return <div>Ocorreu um erro ao buscar os veículos</div>;

    return (
        <div>
            <h1>Última Semana</h1>
            {data?.result?.content.length ?? 0 > 0 ? (
                data?.result?.content.map(vehicle => (
                    <CardCar key={vehicle.id} vehicle={vehicle} />
                ))
            ) : (
                <div>Nenhum veículo encontrado.</div>
            )}
        </div>
    );

}
