import * as FaIcon from "react-icons/fa";
import * as PiIcon from "react-icons/pi";
import PropType from 'prop-types'
function Card({ text, icon, iconType, onClick, btnName, isSelected }) {
  const Icon = iconType === "pi" ? PiIcon[icon] : FaIcon[icon];

  return (
    <button
      onClick={() => {
        onClick(btnName);
      }}
      className={`flex flex-col items-center gap-2 border-2 rounded-lg shadow-lg p-4 transition-all duration-300 scale-75 ${
        isSelected
          ? "border-[#007bff] bg-[#e3f2fd] shadow-xl"
          : "border-slate-200 bg-gradient-to-br from-white to-[#f9f9f9] hover:shadow-xl"
      }`}
    >
      {/* Icon Button */}
      <div
        className={`flex items-center justify-center w-20 h-20 rounded-full transition-colors duration-300 ${
          isSelected
            ? "bg-[#007bff]/30 text-[#0056b3]"
            : "bg-[#007bff]/10 text-[#007bff] hover:bg-[#007bff]/20"
        }`}
      >
        <Icon className="text-4xl" />
      </div>

      {/* Card Text */}
      <span
        className={`mt-1 text-lg font-semibold ${
          isSelected ? "text-[#0056b3]" : "text-slate-700"
        }`}
      >
        {text}
      </span>
    </button>
  );
}

Card.propTypes = {
  text:PropType.string,
  icon:PropType.string,
  iconType:PropType.string,
  onClick:PropType.func,
  btnName:PropType.string,
  isSelected:PropType.bool
}


export default Card;


