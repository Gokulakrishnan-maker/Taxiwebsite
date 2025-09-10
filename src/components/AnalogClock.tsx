import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface AnalogClockProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
}

const AnalogClock: React.FC<AnalogClockProps> = ({
  value,
  onChange,
  placeholder = "Select Time",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  useEffect(() => {
    if (value) {
      const [time, period] = value.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      setSelectedHour(hours);
      setSelectedMinute(minutes);
      setIsAM(period === "AM");
    }
  }, [value]);

  const handleClockClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = event.clientX - centerX;
    const y = event.clientY - centerY;

    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const normalizedAngle = angle < 0 ? angle + 360 : angle;

    const distance = Math.sqrt(x * x + y * y);

    if (distance < 40) return;

    if (distance < 90) {
      // Hours
      const hour = Math.round(normalizedAngle / 30);
      setSelectedHour(hour === 0 ? 12 : hour);
    } else {
      // Minutes
      const minute = Math.round(normalizedAngle / 6) % 60;
      setSelectedMinute(minute);
    }
  };

  const getHandStyle = (value: number, max: number, length: number, color: string) => {
    const angle = (value / max) * 360 - 90;
    return {
      transform: `rotate(${angle}deg)`,
      transformOrigin: "center",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      width: `${length}px`,
      height: "3px",
      backgroundColor: color,
      borderRadius: "2px",
    };
  };

  const handleTimeSelect = () => {
    const timeString = `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
      .toString()
      .padStart(2, "0")} ${isAM ? "AM" : "PM"}`;
    onChange(timeString);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Input Field */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm cursor-pointer border border-gray-300 hover:border-orange-400 transition-colors"
      >
        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || placeholder}
        </span>
      </div>

      {/* Clock Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden">
            
            {/* Digital Time Header */}
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-6xl font-bold">{selectedHour}</span>
                <span className="text-6xl font-bold">
                  {selectedMinute.toString().padStart(2, "0")}
                </span>
                <div className="flex flex-col text-lg font-semibold">
                  <button
                    onClick={() => setIsAM(true)}
                    className={`px-2 py-1 rounded ${
                      isAM ? "bg-white text-blue-600" : "text-white/80"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setIsAM(false)}
                    className={`px-2 py-1 rounded ${
                      !isAM ? "bg-white text-blue-600" : "text-white/80"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Analog Clock */}
            <div className="p-8 flex justify-center">
              <div
                className="relative w-64 h-64 bg-gray-100 rounded-full cursor-pointer"
                onClick={handleClockClick}
              >
                {/* Hour numbers */}
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = ((i + 1) / 12) * 360 - 90;
                  const x = Math.cos((angle * Math.PI) / 180) * 100 + 128;
                  const y = Math.sin((angle * Math.PI) / 180) * 100 + 128;
                  return (
                    <div
                      key={i}
                      className="absolute text-lg font-semibold text-gray-600 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: x, top: y }}
                    >
                      {i + 1}
                    </div>
                  );
                })}

                {/* Hour Hand */}
                <div style={getHandStyle(selectedHour % 12, 12, 60, "#2563eb")} />

                {/* Minute Hand */}
                <div style={getHandStyle(selectedMinute, 60, 90, "#06b6d4")} />

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-4 font-semibold text-gray-500 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleTimeSelect}
                className="flex-1 py-4 font-semibold text-blue-600 hover:bg-blue-50"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalogClock;
