import Body from "./components/Body";
import Header from "./components/Header";
import SidBar from "./components/SidBar";
import SidBarRight from "./components/SidBarRight";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/5 bg-[#F8F9FA] text-white h-screen pt-10 pl-5 pr-5 border border-[#cccdce] z-10">
        <SidBar />
      </div>

      <div className=" flex flex-col w-full">
        <Header />
        <div className="flex-1 overflow-auto">
          <Body />
        </div>
      </div>
      <SidBarRight />

    </div>
  );
}


export default App;
