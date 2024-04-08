import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import CardCar from "./CardCar";
import Modal from "./Modal";
import { ReactElement, useState } from "react";
import YearSelect from "./YearSelect";
import { registerVehicle } from "../services/api";
import SelectBox from "./SelectBox";
import { sortedCarBrandEntries } from "../constants/CarBrand";

export default function RegisterCard() {
    const [brand, setBrand] = useState("")
    const [vehicleName, setVehicleName] = useState("")
    const [description, setDescription] = useState("")
    const [urlImg, setUrlImg] = useState("")
    const [year, setYear] = useState("2024")
    const [isSold, setIsSold] = useState(false)

    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalIcon, setModalIcon] = useState<ReactElement | null>(<CheckCircleIcon className="h-6 w-6 text-green-500" />);
    const [isOpenInfo, setIsOpenInfo] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleYearChange = (e: any) => {
        setYear(e.target.value);
    };

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

    async function handleRegisterVehicle() {
        const response = await registerVehicle(
            {
                vehicleName,
                urlImg,
                brand,
                year: parseInt(year),
                description,
                isSold,
            }
        )

        if (response?.success) {
            isSuccess(response.message!)
        } else {
            isError(response?.error?.message!)
        }
    }

    const handleBrandChange = (e: any) => {
        setBrand(e.target.value);
    };

    const handleIsSoldChange = () => {
        setIsSold(!isSold);
    };
    const buttonStatus = () => {
        if (brand === "" || year === "" || vehicleName === "" || description === "") {
            return true
        }

        return false
    }

    return (
        <form className="flex-1 bg-red px-10 py-5">
            <div className="flex flex-col ml-3  items-start ">
                <span className="mb-4 font-bold">Registrar veículo</span>
                <div>
                    <label className="flex flex-col mr-2 text-[0.8rem]" htmlFor={brand}>Marca</label>
                    <SelectBox fields={sortedCarBrandEntries} onChange={handleBrandChange} />
                </div>
                <div>
                    <label className="flex flex-col mr-2 mt-4 text-[0.8rem]" htmlFor={vehicleName}>Modelo</label>
                    <input placeholder="Digite o modelo..." onChange={(e) => setVehicleName(e.target.value)} className={`mt-2 bg-white border-2 border-gray-300 h-7`} title={vehicleName} type="text" value={vehicleName} />
                </div>
                <div>
                    <label className="flex flex-col mr-2 mt-4 text-[0.8rem]" htmlFor={description}>Descrição</label>
                    <input placeholder="Digite a Descrição..." onChange={(e) => setDescription(e.target.value)} className={`mt-2 bg-white border-2 border-gray-300 w-80 h-7`} title={description} type="text" value={description} />
                </div>
                <div>
                    <label className="flex flex-col mr-2 mt-4 text-[0.8rem]" htmlFor={year}>Ano</label>
                    <YearSelect selectItem={2024} startYear={1990} endYear={new Date().getFullYear()} onChange={handleYearChange} />
                </div>
                <div className=" mt-4">
                    <label htmlFor="Vendidos"> Vendido:</label>
                    <input
                        title='Vendidos'
                        className='ml-2'
                        type="checkbox"
                        name="Vendidos"
                        checked={isSold}
                        onChange={() => handleIsSoldChange()}
                    />
                </div>

                <div className="flex ">
                    <button
                        disabled={buttonStatus()}
                        onClick={() => handleRegisterVehicle()}
                        type='button'
                        className={`${buttonStatus() ? "bg-slate-300" : "bg-slate-700"} font-semibold text-white px-4 py-1  rounded-md  mt-2 w-24 mr-2`}
                    >
                        Salvar
                    </button>

                </div>
            </div>
            {showModalInfo()}
        </form>
    )
}