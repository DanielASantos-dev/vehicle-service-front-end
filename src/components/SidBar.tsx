import React, { useState } from 'react';
import { CarBrand, sortedCarBrandEntries } from "../constants/CarBrand";
import SelectBox from "./SelectBox";
import YearSelect from "./YearSelect";
import { Link, useNavigate } from 'react-router-dom';
import { fetchFindVehicle } from '../services/api';


export default function SidBar() {
    const [isSold, setIsSold] = useState<boolean | null>(null)
    const [year, setYear] = useState("")
    const [brand, setBrand] = useState("")
    const [vehicleName, setVehicleName] = useState("")
    const [starTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const navigate = useNavigate();

    const handleNameChange = (e: any) => {
        setVehicleName(e.target.value);
    };

    const handleYearChange = (e: any) => {
        setYear(e.target.value);
    };

    const handleBrandChange = (e: any) => {
        setBrand(e.target.value);
    };

    const handleIsSoldChange = (e: any) => {
        if (e.target.value === "") {
            setIsSold(null)
        } else {
            setIsSold(e.target.value);
        }
    };

    const search = async (e: any) => {
        e.preventDefault();

        const response = await fetchFindVehicle(
            {
                vehicleName,
                year: year === "" ? null : parseInt(year),
                brand,
                isSold,
                starTime,
                endTime,
            }
        )

        if (response?.success) {
            navigate("/search", { state: { data: response } })
        }
    };

    const statusOptions = [
        { key: "true", value: "Vendidos" },
        { key: "false", value: "Disponíveis" }
    ];



    return (
        <div className={`p-8 h-screen`}>
            <div className='flex flex-col'>
                <Link to={"/"} className="px-4 py-1 text-gray-500 rounded-md font-semibold mb-2">Home</Link>
                <Link to={"/register"} className="px-4 py-1 bg-slate-700 rounded-md font-semibold">Cadastrar veículo</Link>
            </div>
            <div className='mt-2'>
                <label className='text-gray-500 font-semibold flex'>Nome</label>
                <input
                    className=' text-gray-500 border-2 border-gray-200'
                    type="text"
                    maxLength={25}
                    placeholder='Digite um nome...'
                    value={vehicleName}
                    onChange={(e) => handleNameChange(e)}
                />
            </div>
            <form className='' onSubmit={search}>
                <div>
                    <h1 className="text-gray-500 font-semibold  mt-1">Ano</h1>
                    <YearSelect startYear={1990} endYear={new Date().getFullYear()} onChange={handleYearChange} />
                </div>
                <div>
                    <h1 className="text-gray-500 font-semibold mt-2">Marca</h1>
                    <SelectBox fields={sortedCarBrandEntries} onChange={handleBrandChange} />
                </div>

                <div>
                    <h1 className="text-gray-500 font-semibold mt-2">Status</h1>
                    <SelectBox fields={statusOptions} onChange={handleIsSoldChange} />
                </div>
                <button type='submit' className='px-4 py-1 bg-slate-700 rounded-md  font-semibold mt-2'>Buscar</button>
            </form>
        </div>
    );
}
