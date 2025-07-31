import React, { useEffect, useRef } from 'react';
import { CrowdZone } from '../types';

interface GoogleMapProps {
  zones: CrowdZone[];
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  selectedLocation?: { lat: number; lng: number };
  height?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  zones, 
  onLocationSelect, 
  selectedLocation, 
  height = 'h-64' 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 22.7196, lng: 75.8577 },
      zoom: 15,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    mapInstance.current = map;

    // Add click listener for location selection
    if (onLocationSelect) {
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          onLocationSelect({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          });
        }
      });
    }

    // Add crowd zones
    zones.forEach(zone => {
      const color = {
        low: '#22c55e',
        medium: '#f59e0b',
        high: '#ef4444',
        critical: '#dc2626'
      }[zone.level];

      const polygon = new google.maps.Polygon({
        paths: zone.coordinates,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map: map
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold text-lg">${zone.name}</h3>
            <p class="text-sm text-gray-600">Occupancy: ${zone.occupancy}%</p>
            <p class="text-sm capitalize font-medium" style="color: ${color}">
              ${zone.level.toUpperCase()} DENSITY
            </p>
          </div>
        `
      });

      polygon.addListener('click', (event: google.maps.PolygonMouseEvent) => {
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });
    });

    // Add selected location marker
    if (selectedLocation) {
      new google.maps.Marker({
        position: selectedLocation,
        map: map,
        title: 'Selected Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });
    }

  }, [zones, onLocationSelect, selectedLocation]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full ${height} rounded-lg border border-gray-200`}
    />
  );
};

export default GoogleMap;