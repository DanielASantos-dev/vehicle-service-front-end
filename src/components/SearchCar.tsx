import CardCar from "./CardCar";
import { BaseResponse } from "../types/baseResponse";
import { ResultAllVehicle } from "../types/findAllVehicleResponse";
import { useLocation } from 'react-router-dom';




export default function SearchCar() {
    const location = useLocation();
    const data = location.state?.data as BaseResponse<ResultAllVehicle>;

    return (
        <div>
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
