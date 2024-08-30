import { Link } from "react-router-dom";

export default function DashboardPage() {
  const calculateRemainingDays = () => {
    const millisecondToDayConversionConst = 86400000;
    const dDay = Date.parse("02 Oct 2048");
    const daysLeft = (dDay - Date.now()) / millisecondToDayConversionConst;
    return Math.ceil(daysLeft);
  };

  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-row justify-center items-center grow min-h-screen">
        <div className="shadow-md rounded-sm p-3 ">
          <h1 className="font-bold"> {calculateRemainingDays()} Days Left </h1>
        </div>
      </div>
    </div>
  );
}

function SideBar() {
  return (
    <div className="static">
      <div className="flex flex-col">
        <Link className="p-3" to={"/notes"}>
          Notes
        </Link>
        <Link className="p-3" to={"/tracker"}>
          Tracker
        </Link>
        <Link className="p-3" to={"/timebox"}>
          TimeBoxer
        </Link>
      </div>
    </div>
  );
}
