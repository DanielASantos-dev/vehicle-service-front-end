import { ReactElement, useState } from "react"
import Modal from "./Modal"
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid"
import { deleteVehicle, updateVehicle } from "../services/api"
import { Vehicle } from "../types/findAllVehicleResponse"
import { useQueryClient } from 'react-query';
import { sortedCarBrandEntries } from "../constants/CarBrand"
import SelectBox from "./SelectBox"
import YearSelect from "./YearSelect"
import { formatDate, getDateNDaysBefore } from "../functions/utils"


interface CardCarProps {
    vehicle: Vehicle
}

export default function CardCar(props: CardCarProps) {
    const { vehicle } = props
    const queryClient = useQueryClient();
    const [brand, setBrand] = useState(vehicle.brand)
    const [vehicleName, setVehicleName] = useState(vehicle.vehicleName)
    const [description, setDescription] = useState(vehicle.description)
    const [year, setYear] = useState(vehicle.year)
    const [isSold, setIsSold] = useState(vehicle.sold)
    const [disabled, setDisabled] = useState(true)
    const [modalMessage, setModalMessage] = useState("");
    const [isOpenAction, setIsOpenAction] = useState(false)
    const [actionFunctionModal, setActionFunctionModal] = useState("")

    const ALERT_DELETE_CARD = `Você realmente deseja deletar o veículo  ${vehicle.vehicleName}`
    const ALERT_UPDATE_CARD = `Você realmente deseja atualizar o veículo ${vehicle.vehicleName}`

    const [modalTitle, setModalTitle] = useState("");
    const [modalIcon, setModalIcon] = useState<ReactElement | null>(<CheckCircleIcon className="h-6 w-6 text-green-500" />);
    const [isOpenInfo, setIsOpenInfo] = useState(false)
    const [loading, setLoading] = useState(false);

    function onCloseInfo() {
        setIsOpenInfo(false)
    }

    function isSuccess(message: string) {
        setModalIcon(<CheckCircleIcon className="h-6 w-6 text-green-500" />);
        setModalTitle("Sucesso");
        setModalMessage(message);
        setIsOpenInfo(true);
    }

    function isError(message: string) {
        setModalIcon(<ExclamationTriangleIcon className="h-6 w-6 text-red-500" />);
        setModalTitle("Erro na Operação");
        setModalMessage(message);
        setIsOpenInfo(true);
    }

    function showModalInfo() {
        return (
            <Modal isOpen={isOpenInfo} onClose={onCloseInfo} title={modalTitle}>
                <div className="flex flex-col items-center mb-6">
                    {modalIcon}
                    <h1 className="mt-1 text-[0.7rem]">{modalMessage}</h1>
                </div>
            </Modal>
        )
    }

    function onCloseAction() {
        setIsOpenAction(false)
    }

    const handleIsSoldChange = () => {
        setIsSold(!isSold);
    };

    const params = {
        startTime: formatDate(getDateNDaysBefore(7)),
        endTime: formatDate(new Date()),
    };

    const paramsAll = {

    };

    async function handleUpdateVehicle() {
        setLoading(true)
        const response = await updateVehicle(vehicle.id,
            {
                vehicleName,
                urlImg: vehicle.urlImg,
                brand,
                year,
                description,
                isSold,
            }
        )

        if (response?.success) {
            isSuccess(response.message!)
            queryClient.invalidateQueries(['findVehicle']);
            queryClient.invalidateQueries(['findVehicleHeader']);
        } else {
            isError(response?.error?.message!)
        }
        setLoading(false)
    }


    async function handleDeleteVehicle() {
        setLoading(true)
        const response = await deleteVehicle(vehicle.id)

        if (response?.success) {
            isSuccess(response.message!)
            queryClient.invalidateQueries(['findVehicle']);
            queryClient.invalidateQueries(['findVehicleHeader']);
        } else {
            isError(response?.error?.message!)
        }
        setLoading(false)
    }

    function showModalAction() {
        switch (actionFunctionModal) {
            case "DELETE":
                return (
                    <Modal isOpen={isOpenAction} onClose={onCloseAction} action={handleDeleteVehicle} isAction>
                        <div className="flex flex-col items-center mb-6">
                            <h1 className="mt-1 text-[0.7rem]">{modalMessage}</h1>
                        </div>
                    </Modal>
                );
            case "UPDATE":
                return (
                    <Modal isOpen={isOpenAction} onClose={onCloseAction} action={handleUpdateVehicle} isAction>
                        <div className="flex flex-col items-center mb-6">
                            <h1 className="mt-1 text-[0.7rem]">{modalMessage}</h1>
                        </div>
                    </Modal>
                );
            default:
                return null;
        }
    }


    function setIsOpenModalAction(message: string, functionSelected: string) {
        setModalMessage(message)
        setActionFunctionModal(functionSelected)
        setIsOpenAction(true)
    }

    const handleBrandChange = (e: any) => {
        setBrand(e.target.value);
    };

    const handleYearChange = (e: any) => {
        setYear(e.target.value);
    };


    return (
        <div className="flex mt-4 shadow-md hover:shadow-xl">
            <div className="">
                <img src={vehicle.urlImg} alt={vehicle.vehicleName} style={{ width: '400px', height: '250px' }} />
            </div>
            <div>
                <div className="flex flex-col ml-3">
                    <SelectBox fields={sortedCarBrandEntries} onChange={handleBrandChange} selectItem={vehicle.brand} />
                    <input onChange={(e) => setVehicleName(e.target.value)} disabled={disabled} className={`mt-2 ${disabled ? "bg-slate-200" : "bg-slate-100"}`} title={vehicleName} type="text" value={vehicleName} />
                    <input onChange={(e) => setDescription(e.target.value)} disabled={disabled} className={`mb-2 mt-2 ${disabled ? "bg-slate-200" : "bg-slate-100"}`} title={description} type="text" value={description} />
                    <YearSelect selectItem={vehicle.year} startYear={1990} endYear={new Date().getFullYear()} onChange={handleYearChange} />
                    <div>
                        <label htmlFor="Vendidos"> Vendido:</label>
                        <input
                            disabled={disabled}
                            title='Vendidos'
                            className='ml-2'
                            type="checkbox"
                            name="Vendidos"
                            checked={isSold}
                            onChange={() => handleIsSoldChange()}
                        />
                    </div>
                    <span className="font-semibold text-[1.2rem]">Ford</span>

                    <div className="flex">
                        <button
                            onClick={disabled ? () => setDisabled(false) : () => setIsOpenModalAction(ALERT_UPDATE_CARD, "UPDATE")}
                            type='button'
                            className='font-semibold text-white px-4 py-1 bg-slate-700 rounded-md  mt-2 w-24 mr-2'
                        >
                            {disabled ? "Editar" : "Atualizar"}
                        </button>

                        <button
                            onClick={() => setIsOpenModalAction(ALERT_DELETE_CARD, "DELETE")}
                            type='button'
                            className='font-semibold text-white px-4 py-1 bg-red-700 rounded-md  mt-2 w-24'>Excluir</button>
                    </div>
                </div>
            </div>
            {showModalAction()}
            {showModalInfo()}
        </div>
    )
}