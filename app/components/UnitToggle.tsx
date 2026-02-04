interface UnitToggleProps {
  isCelsius: boolean;
  setIsCelsius: (isCelsius: boolean) => void;
}


export default function UnitToggle({ isCelsius, setIsCelsius }: UnitToggleProps) {
  const handleToggle = () => {
    setIsCelsius(!isCelsius);
  }; 
  return (
    <div>
      <button
        onClick={handleToggle}
        className="cursor-pointer text-sm sm:text-base lg:text-lg mr-2 sm:mr-3 font-semibold hover:text-gray-400 transition-colors"
      >
        {isCelsius ? "°C" : "°F"}
      </button>
    </div>
  );
}
