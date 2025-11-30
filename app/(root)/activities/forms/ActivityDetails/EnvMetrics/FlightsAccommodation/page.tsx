'use client';

import React, { useState, useEffect, useMemo } from 'react';
import airportsData from '@/app/utils/airports.json';
import { calculateDistance } from '@/app/utils/haversine';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Plane } from 'lucide-react';

type CabinClass = 'Economy' | 'Business Class' | 'First Class' | 'Private Jet';
type TripType = 'Single way' | 'Return';

interface Airport {
  lat: number;
  lon: number;
  name: string;
}

const AIRPORTS = airportsData as Record<string, Airport>;

const ALL_AIRPORTS = Object.entries(AIRPORTS).map(([code, data]) => ({
  code,
  ...data,
}));

// === Emission Factors – UK DEFRA 2025 ===
const FLIGHT_FACTORS_KG_PER_PKM: Record<CabinClass, { short: number; long: number }> = {
  Economy: { short: 0.15182, long: 0.09542 },
  'Business Class': { short: 0.45546, long: 0.28626 },
  'First Class': { short: 0.60728, long: 0.38168 },
  'Private Jet': { short: 4.20, long: 4.20 },
};

const HOTEL_FACTORS_KG_PER_ROOM_NIGHT: Record<string, number> = {
  'UK': 11.9,
  'Europe (EU + others)': 11.2,
  'United States': 20.8,
  'China': 18.5,
  'India': 12.4,
  'Australia': 15.6,
  'Japan': 14.3,
  'Brazil': 9.8,
  'Canada': 17.2,
  'South Africa': 16.1,
  'United Arab Emirates': 32.1,
  'Singapore': 28.7,
  'Other / Global Average': 13.7,
};

const hotelCountries = Object.keys(HOTEL_FACTORS_KG_PER_ROOM_NIGHT);
const cabinClasses: CabinClass[] = ['Economy', 'Business Class', 'First Class', 'Private Jet'];
const tripTypes: TripType[] = ['Single way', 'Return'];

const FlightsAccommodation: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  // === Flight State ===
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originAirport, setOriginAirport] = useState<{ code: string; name: string; lat: number; lon: number } | null>(null);
  const [destinationAirport, setDestinationAirport] = useState<{ code: string; name: string; lat: number; lon: number } | null>(null);
  const [cabinClass, setCabinClass] = useState<CabinClass | ''>('');
  const [tripType, setTripType] = useState<TripType | ''>('');
  const [autoDistance, setAutoDistance] = useState<number | null>(null);
  const [manualDistanceOverride, setManualDistanceOverride] = useState<string>('');

  // Dropdown states
  const [originSuggestionsOpen, setOriginSuggestionsOpen] = useState(false);
  const [destSuggestionsOpen, setDestSuggestionsOpen] = useState(false);
  const [cabinDropdownOpen, setCabinDropdownOpen] = useState(false);
  const [tripDropdownOpen, setTripDropdownOpen] = useState(false);
  const [hotelDropdownOpen, setHotelDropdownOpen] = useState(false);

  // === Hotel State ===
  const [hotelCountry, setHotelCountry] = useState('');
  const [rooms, setRooms] = useState('');
  const [nights, setNights] = useState('');

  // === Airport Autocomplete ===
  const originSuggestions = useMemo(() => {
    if (!originInput || originInput.length < 2) return [];
    const query = originInput.toUpperCase();
    return ALL_AIRPORTS
      .filter(a => a.code.includes(query) || a.name.toUpperCase().includes(query))
      .slice(0, 10);
  }, [originInput]);

  const destinationSuggestions = useMemo(() => {
    if (!destinationInput || destinationInput.length < 2) return [];
    const query = destinationInput.toUpperCase();
    return ALL_AIRPORTS
      .filter(a => a.code.includes(query) || a.name.toUpperCase().includes(query))
      .slice(0, 10);
  }, [destinationInput]);

  // === Calculate distance when both airports are selected ===
  useEffect(() => {
    if (originAirport && destinationAirport) {
      const dist = calculateDistance(
        originAirport.lat,
        originAirport.lon,
        destinationAirport.lat,
        destinationAirport.lon
      );
      setAutoDistance(dist);
      setManualDistanceOverride('');
    }
  }, [originAirport, destinationAirport]);

  // Final distance (user can override)
  const finalDistance = manualDistanceOverride ? parseFloat(manualDistanceOverride) || 0 : autoDistance || 0;
  const isLongHaul = finalDistance > 3700;

  const flightFactor = cabinClass
    ? isLongHaul
      ? FLIGHT_FACTORS_KG_PER_PKM[cabinClass].long
      : FLIGHT_FACTORS_KG_PER_PKM[cabinClass].short
    : 0;

  const flightEmissionsTonnes = flightFactor * finalDistance * (tripType === 'Return' ? 2 : 1) / 1000;

  const flightValid =
    originAirport &&
    destinationAirport &&
    cabinClass &&
    tripType &&
    finalDistance >= 100 &&
    flightEmissionsTonnes > 0;

  const handleAddFlight = () => {
    if (!flightValid) return;

    const distLabel = manualDistanceOverride
      ? `(edited: ${finalDistance.toLocaleString()} km)`
      : `${finalDistance.toLocaleString()} km`;

    const details = `${originAirport!.code} → ${destinationAirport!.code} (${cabinClass}, ${tripType}, ${distLabel})`;

    onAddEntry({
      category: 'Flights & accommodation',
      details,
      result: Number(flightEmissionsTonnes.toFixed(6)),
    });

    // Reset form
    setOriginInput('');
    setDestinationInput('');
    setOriginAirport(null);
    setDestinationAirport(null);
    setCabinClass('');
    setTripType('');
    setAutoDistance(null);
    setManualDistanceOverride('');
  };

  // === Hotel Logic (unchanged) ===
  const hotelFactorKg = hotelCountry ? HOTEL_FACTORS_KG_PER_ROOM_NIGHT[hotelCountry] : 0;
  const totalRoomNights = rooms && nights ? parseFloat(rooms) * parseFloat(nights) : 0;
  const hotelEmissionsTonnes = totalRoomNights * hotelFactorKg / 1000;
  const hotelValid = hotelCountry && rooms && nights && parseFloat(rooms) > 0 && parseFloat(nights) > 0;

  const handleAddHotel = () => {
    if (!hotelValid) return;

    onAddEntry({
      category: 'Flights & accommodation',
      details: `Hotel stay in ${hotelCountry}: ${rooms} room(s) × ${nights} night(s) = ${totalRoomNights} room-nights`,
      result: Number(hotelEmissionsTonnes.toFixed(6)),
    });

    setHotelCountry('');
    setRooms('');
    setNights('');
  };

  return (
    <div className="space-y-10">
      <h3 className="text-lg font-medium text-gray-700">Flights & Accommodation Emissions</h3>

      {/* ====================== FLIGHTS ====================== */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-base font-medium text-gray-600">
          <span>Flights (per passenger)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Origin */}
          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">
              Origin Airport <span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              value={originInput}
              onChange={(e) => {
                setOriginInput(e.target.value);
                setOriginAirport(null);
                setOriginSuggestionsOpen(true);
              }}
              onFocus={() => originInput.length >= 2 && setOriginSuggestionsOpen(true)}
              placeholder="Type IATA code or airport name..."
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
            />

            {originSuggestionsOpen && originSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {originSuggestions.map((airport) => (
                  <div
                    key={airport.code}
                    onClick={() => {
                      setOriginInput(`${airport.code} – ${airport.name}`);
                      setOriginAirport({ ...airport, lat: airport.lat, lon: airport.lon });
                      setOriginSuggestionsOpen(false);
                    }}
                    className="px-4 py-3 text-xs hover:bg-gray-50 cursor-pointer flex justify-between"
                  >
                    <span>
                      <strong className="text-gray-900">{airport.code}</strong> – {airport.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Destination */}
          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">
              Destination Airport <span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              value={destinationInput}
              onChange={(e) => {
                setDestinationInput(e.target.value);
                setDestinationAirport(null);
                setDestSuggestionsOpen(true);
              }}
              onFocus={() => destinationInput.length >= 2 && setDestSuggestionsOpen(true)}
              placeholder="Type IATA code or airport name..."
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
            />

            {destSuggestionsOpen && destinationSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {destinationSuggestions.map((airport) => (
                  <div
                    key={airport.code}
                    onClick={() => {
                      setDestinationInput(`${airport.code} – ${airport.name}`);
                      setDestinationAirport({ ...airport, lat: airport.lat, lon: airport.lon });
                      setDestSuggestionsOpen(false);
                    }}
                    className="px-4 py-3 text-xs hover:bg-gray-50 cursor-pointer flex justify-between"
                  >
                    <span>
                      <strong className="text-gray-900">{airport.code}</strong> – {airport.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Distance Info + Editable Override */}
        {autoDistance !== null && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs">
              <strong>Great-circle distance:</strong> {autoDistance.toLocaleString()} km
              {' • '}
              {isLongHaul ? 'Long-haul flight' : 'Short/Medium-haul flight'}
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-600">Override distance if needed (e.g. layovers):</span>
              <input
                type="number"
                value={manualDistanceOverride}
                onChange={(e) => setManualDistanceOverride(e.target.value)}
                placeholder={autoDistance.toString()}
                className="w-32 px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
              <span>km</span>
            </div>
          </div>
        )}

        {/* Cabin Class & Trip Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">Class <span className="text-red-600">*</span></p>
            <div
              onClick={() => setCabinDropdownOpen(!cabinDropdownOpen)}
              className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
                cabinDropdownOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={cabinClass ? 'text-gray-900' : 'text-gray-500'}>
                {cabinClass || 'Select class'}
              </span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${cabinDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {cabinDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {cabinClasses.map((c) => (
                  <div
                    key={c}
                    onClick={() => {
                      setCabinClass(c);
                      setCabinDropdownOpen(false);
                    }}
                    className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">Trip Type <span className="text-red-600">*</span></p>
            <div
              onClick={() => setTripDropdownOpen(!tripDropdownOpen)}
              className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
                tripDropdownOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={tripType ? 'text-gray-900' : 'text-gray-500'}>
                {tripType || 'Select type'}
              </span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${tripDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {tripDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {tripTypes.map((t) => (
                  <div
                    key={t}
                    onClick={() => {
                      setTripType(t);
                      setTripDropdownOpen(false);
                    }}
                    className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {flightValid && (
          <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
            <p className="text-xs text-[#044D5E]">
              <strong>Preview:</strong> {originAirport?.code} → {destinationAirport?.code} ({cabinClass}, {tripType})
              {' • '} {finalDistance.toLocaleString()} km →{' '}
              <span className="font-mono font-bold text-[#044D5E]">
                {flightEmissionsTonnes.toFixed(6)}
              </span>{' '}
              tCO₂e per passenger
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddFlight}
          disabled={!flightValid}
          className="w-full py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Flight Emissions
        </button>
      </div>

      {/* ====================== HOTEL ====================== */}
      <div className="space-y-6 pt-8 border-t border-gray-200">
        <h4 className="text-base font-medium text-gray-600">Hotel Accommodation</h4>

        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">
            Country / Region <span className="text-red-600">*</span>
          </p>
          <div
            onClick={() => setHotelDropdownOpen(!hotelDropdownOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              hotelDropdownOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={hotelCountry ? 'text-gray-900' : 'text-gray-500'}>
              {hotelCountry || 'Select country/region'}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${hotelDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {hotelDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {hotelCountries.map((c) => (
                <div
                  key={c}
                  onClick={() => {
                    setHotelCountry(c);
                    setHotelDropdownOpen(false);
                  }}
                  className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">
              Number of occupied rooms <span className="text-red-600">*</span>
            </p>
            <input
              type="number"
              min="1"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              placeholder="e.g. 8"
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
            />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">
              Nights per room <span className="text-red-600">*</span>
            </p>
            <input
              type="number"
              min="1"
              value={nights}
              onChange={(e) => setNights(e.target.value)}
              placeholder="e.g. 4"
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
            />
          </div>
        </div>

        {hotelValid && (
          <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
            <p className="text-xs text-[#044D5E]">
              <strong>Preview:</strong> {hotelCountry} – {totalRoomNights} room-nights × {hotelFactorKg.toFixed(1)} kg CO₂e →{' '}
              <span className="font-mono font-bold text-[#044D5E]">
                {hotelEmissionsTonnes.toFixed(6)}
              </span>{' '}
              tCO₂e
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddHotel}
          disabled={!hotelValid}
          className="w-full py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Hotel Emissions
        </button>

        <p className="text-xs text-gray-500">
          Source: UK Government GHG Conversion Factors 2025 (includes radiative forcing)
        </p>
      </div>
    </div>
  );
};

export default FlightsAccommodation;