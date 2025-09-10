import React, { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';

interface AnalogClockProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ value, onChange, placeholder = "Select Time" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(5);
  const [selectedMinute, setSelectedMinute] = useState(29);
  const [isAM, setIsAM] = useState(true);

  useEffect(() => {
    if (value) {
      if (value.includes('AM') || value.includes('PM')) {
        // 12-hour format
        const [time, period] = value.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        setSelectedHour(hours);
        setSelectedMinute(minutes);
        setIsAM(period === 'AM');
      } else {
        // 24-hour format (fallback)
        const [hours, minutes] = value.split(':').map(Number);
        setSelectedHour(hours > 12 ? hours - 12 : hours === 0 ? 12 : hours);
        setSelectedMinute(minutes);
        setIsAM(hours < 12);
      }
    }
  }, [value]);

  const handleTimeSelect = () => {
    const timeString = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')} ${isAM ? 'AM' : 'PM'}`;
    onChange(timeString);
    setIsOpen(false);
  };


  const handleClockClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = event.clientX - centerX;
    const y = event.clientY - centerY;
    
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const normalizedAngle = angle < 0 ? angle + 360 : angle;
    
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance < 30) return; // Too close to center
    
    if (distance < 80) {
      // Hour selection (inner area)
      const hour = Math.round(normalizedAngle / 30);
      setSelectedHour(hour === 0 ? 12 : hour);
    } else {
      // Minute selection (outer area)
      const minute = Math.round(normalizedAngle / 6) % 60;
      setSelectedMinute(minute);
    }
  };

  const getMinuteHandStyle = () => {
    const angle = (selectedMinute / 60) * 360 - 90;
    return {
      transform: `rotate(${angle}deg)`,
      transformOrigin: '2px 50%',
    };
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(true)}
        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm cursor-pointer border border-gray-300 hover:border-orange-400 transition-colors"
      >
        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            
            {/* Digital Time Display Header */}
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="text-6xl font-bold">{selectedHour}</div>
                <div className="text-6xl font-bold border-4 border-white rounded-lg px-3 py-1">
                  {selectedMinute.toString().padStart(2, '0')}
                </div>
                <div className="flex flex-col text-lg font-semibold">
                  <button
                    onClick={() => setIsAM(true)}
                    className={`px-3 py-1 rounded transition-colors ${
                      isAM ? 'bg-white text-blue-500' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setIsAM(false)}
                    className={`px-3 py-1 rounded transition-colors ${
                      !isAM ? 'bg-white text-blue-500' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Analog Clock */}
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div 
                  className="relative w-64 h-64 bg-gray-100 rounded-full cursor-pointer select-none"
                  onClick={handleClockClick}
                >
                  {/* Minute markers and numbers */}
                  {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute) => {
                    const angle = (minute / 60) * 360 - 90;
                    const x = Math.cos(angle * Math.PI / 180) * 110 + 128;
                    const y = Math.sin(angle * Math.PI / 180) * 110 + 128;
                    return (
                      <div
                        key={minute}
                        className="absolute text-lg font-semibold text-gray-600 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: x, top: y }}
                      >
                        {minute.toString().padStart(2, '0')}
                      </div>
                    );
                  })}

                  {/* Minute markers (small dots) */}
                  {Array.from({ length: 60 }, (_, i) => {
                    if (i % 5 !== 0) {
                      const angle = (i / 60) * 360 - 90;
                      const x = Math.cos(angle * Math.PI / 180) * 105 + 128;
                      const y = Math.sin(angle * Math.PI / 180) * 105 + 128;
                      return (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: x, top: y }}
                        />
                      );
                    }
                    return null;
                  })}

                  {/* Minute Hand */}
                  <div
                    className="absolute top-1/2 left-1/2 bg-cyan-500 h-1 rounded-full origin-left z-20"
                    style={{
                      ...getMinuteHandStyle(),
                      width: '90px',
                      marginLeft: '-2px',
                      marginTop: '-2px'
                    }}
                  />

                  {/* Center Dot */}
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-cyan-500 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleTimeSelect}
                  className="flex-1 text-cyan-500 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalogClock;