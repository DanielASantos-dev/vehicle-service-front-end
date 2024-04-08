import CardCar from "./CardCar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import RegisterCard from "./RegisterCard";
import SearchCar from "./SearchCar";



export default function Body() {

    return (
        <div className="flex-1 bg-red px-10 py-5">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterCard />} />
                <Route path="/search" element={<SearchCar />} />
            </Routes>

        </div>
    )
}