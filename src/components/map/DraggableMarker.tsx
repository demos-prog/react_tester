import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet';

type DraggableMarkerProps = {
  setZoom: (zoom: number) => void,
  setMapCenter: (mapCenter: [number, number]) => void,
  mapCenter: [number, number]
  label: string
};

const DraggableMarker: React.FC<DraggableMarkerProps> = ({ mapCenter, setMapCenter, label, setZoom }) => {
  const [position, setPosition] = useState(mapCenter)
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newCoords = (marker as any).getLatLng();
          setPosition(newCoords)
          setMapCenter([newCoords.lat, newCoords.lng]);
        }
      },
    }),
    [],
  )

  useEffect(() => {
    setPosition(mapCenter);
  }, [mapCenter])

  const map = useMap();
  const handleZoomEnd = useCallback(() => {
    setZoom(map.getZoom());
  }, [map]);
  useMapEvent('zoomend', handleZoomEnd);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        {label}
      </Popup>
    </Marker>
  )
};

export default DraggableMarker;



