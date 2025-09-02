import { FARE_CONFIG } from '../config/api';

// Coimbatore specific distance data for common routes
export const COIMBATORE_ROUTES = {
  'coimbatore junction to airport': 12,
  'rs puram to brookefields': 8,
  'gandhipuram to codissia': 15,
  'peelamedu to singanallur': 6,
  'town hall to psg tech': 10,
  'saibaba colony to fun mall': 7,
  'race course to prozone mall': 9,
  'ukkadam to tidel park': 18
};

export interface FareCalculation {
  baseFare: number;
  distanceFare: number;
  nightSurcharge: number;
  acSurcharge: number;
  totalFare: number;
  estimatedTime: string;
  distance: string;
}

export const calculateFare = (
  distanceKm: number,
  vehicleType: 'economy' | 'premium' | 'executive' = 'economy',
  isNightTime: boolean = false,
  hasAC: boolean = true
): FareCalculation => {
  const baseFare = FARE_CONFIG.baseFare;
  const perKmRate = FARE_CONFIG.perKmRate[vehicleType];
  
  const distanceFare = distanceKm * perKmRate;
  const acSurcharge = hasAC ? distanceKm * FARE_CONFIG.acSurcharge : 0;
  const nightSurcharge = isNightTime ? (baseFare + distanceFare) * FARE_CONFIG.nightSurcharge : 0;
  
  const totalFare = baseFare + distanceFare + acSurcharge + nightSurcharge;
  
  // Estimate time (assuming average speed of 30 km/h in city)
  const estimatedMinutes = Math.round((distanceKm / 30) * 60);
  const hours = Math.floor(estimatedMinutes / 60);
  const minutes = estimatedMinutes % 60;
  const estimatedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  
  return {
    baseFare,
    distanceFare,
    nightSurcharge,
    acSurcharge,
    totalFare: Math.round(totalFare),
    estimatedTime,
    distance: `${distanceKm.toFixed(1)} km`
  };
};

export const getOutstationFare = (
  distanceKm: number,
  days: number = 1,
  vehicleType: 'economy' | 'premium' | 'executive' = 'economy'
): number => {
  const perKmRate = FARE_CONFIG.perKmRate[vehicleType];
  const driverAllowance = FARE_CONFIG.driverAllowance.outstation * days;
  
  // For outstation, calculate round trip distance
  const roundTripDistance = distanceKm * 2;
  const fareWithoutAllowance = roundTripDistance * perKmRate;
  
  return Math.round(fareWithoutAllowance + driverAllowance);
};