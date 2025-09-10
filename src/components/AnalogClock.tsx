import React, { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';

interface AnalogClockProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ value, onChange, placeholder = "Select Time" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);
  const [isDragging, setIsDragging] = useState<'hour' | 'minute' | null>(null);

  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      setSelectedHour(hours > 12 ? hours - 12 : hours === 0 ? 12 : hours);
      setSelectedMinute(minutes);
      setIsAM(hours < 12);
    }
  }, [value]);

  const handleTimeSelect = () => {
    let hour24 = selectedHour;
    if (!isAM && selectedHour !== 12) hour24 += 12;
    if (isAM && selectedHour === 12) hour24 = 0;
    
    const timeString = `${hour24.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onChange(timeString);
    setIsOpen(false);
  };

  const formatDisplayTime = (time: string) => {
    if (!time) return placeholder;
    const [hours, minutes] = time.split(':').map(Number);
    const hour12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const getClockHandStyle = (value: number, max: number, length: number) => {
    const angle = (value / max) * 360 - 90;
    return {
      transform: `rotate(${angle}deg)`,
      transformOrigin: '4px 50%',
      width: `${length}px`,
    };
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
    
    if (distance < 40) return; // Too close to center
    
    if (distance < 70) {
      // Hour hand area
      const hour = Math.round(normalizedAngle / 30);
      setSelectedHour(hour === 0 ? 12 : hour);
    } else if (distance < 90) {
      // Minute hand area
      const minute = Math.round(normalizedAngle / 6) % 60;
      setSelectedMinute(minute);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, hand: 'hour' | 'minute') => {
    event.preventDefault();
    setIsDragging(hand);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = event.clientX - centerX;
    const y = event.clientY - centerY;
    
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const normalizedAngle = angle < 0 ? angle + 360 : angle;
    
    if (isDragging === 'hour') {
      const hour = Math.round(normalizedAngle / 30);
      setSelectedHour(hour === 0 ? 12 : hour);
    } else if (isDragging === 'minute') {
      const minute = Math.round(normalizedAngle / 6) % 60;
      setSelectedMinute(minute);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(true)}
        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm cursor-pointer border border-gray-300 hover:border-orange-400 transition-colors"
      >
        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {formatDisplayTime(value)}
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Select Time</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Analog Clock Display */}
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full border-8 border-white shadow-lg">
                className="relative w-48 h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full border-8 border-white shadow-lg cursor-pointer select-none"
                onClick={handleClockClick}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                {/* Clock Numbers */}
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => {
                  const angle = (index * 30) - 90;
                  const x = Math.cos(angle * Math.PI / 180) * 70 + 96;
                  const y = Math.sin(angle * Math.PI / 180) * 70 + 96;
                  return (
                    <div
                      key={num}
                      className="absolute text-lg font-bold text-gray-700 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: x, top: y }}
                    >
                      {num}
                    </div>
                  );
                })}

                {/* Hour Hand */}
                <div
                  className="absolute top-1/2 left-1/2 bg-gray-800 h-2 rounded-full origin-left z-10 cursor-grab active:cursor-grabbing"
                  className="absolute top-1/2 left-1/2 bg-gray-800 h-1 rounded-full origin-left z-10"
                  style={getClockHandStyle(selectedHour + selectedMinute / 60, 12, 50)}
                  onMouseDown={(e) => handleMouseDown(e, 'hour')}
                />

                {/* Minute Hand */}
                <div
                  className="absolute top-1/2 left-1/2 bg-blue-600 h-1 rounded-full origin-left z-20 cursor-grab active:cursor-grabbing"
                  className="absolute top-1/2 left-1/2 bg-blue-600 h-0.5 rounded-full origin-left z-20"
                  style={getClockHandStyle(selectedMinute, 60, 70)}
                  onMouseDown={(e) => handleMouseDown(e, 'minute')}
                />

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30"></div>
                
                {/* Instruction Text */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center whitespace-nowrap">
                  Click or drag hands to set time
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              {/* AM/PM Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Period</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsAM(true)}
                    className={`flex-1 p-3 rounded-lg font-semibold transition-all ${
                      isAM
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setIsAM(false)}
                    className={`flex-1 p-3 rounded-lg font-semibold transition-all ${
                      !isAM
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>

              {/* Selected Time Display */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                <div className="text-sm text-blue-600 font-semibold mb-1">Selected Time</div>
                <div className="text-2xl font-bold text-blue-800">
                  {selectedHour}:{selectedMinute.toString().padStart(2, '0')} {isAM ? 'AM' : 'PM'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTimeSelect}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  Select Time
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