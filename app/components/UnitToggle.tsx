interface UnitToggleProps {
  isCelsius: boolean;
  setIsCelsius: (isCelsius: boolean) => void;
}


export default function UnitToggle({ isCelsius, setIsCelsius }: UnitToggleProps) {
  const handleToggle = () => {
    setIsCelsius(!isCelsius); // toggle the value
  }; 
  return (
    <div>
      <button
        onClick={handleToggle}
        className="cursor-pointer text-xl mr-3 font-bold"
      >
        {isCelsius ? "°C" : "°F"}
      </button>
    </div>
  );
}
