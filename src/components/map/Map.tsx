import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import DraggableMarker from './DraggableMarker';


const Map: React.FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([53.9024716, 27.5618225]);
  const [zoom, setZoom] = useState<number>(13);
  const [label, setLabel] = useState<string>("");
  const provider = new OpenStreetMapProvider();

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  async function get_label() {
    const results = await provider.search({ query: mapCenter.join(",") });
    if (results && results.length > 0) {
      setLabel(results[0].label);
    }
  }

  useEffect(() => {
    get_label();
    if (input.current) {
      input.current.value = label;
    }
  }, [mapCenter, label])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.current) {
      const address = input.current.value;
      const results = await provider.search({ query: address });
      if (results && results.length > 0) {
        const { x, y } = results[0];
        const newPosition: [number, number] = [y, x];
        setMapCenter(newPosition);
        get_label();
      }
    }
  }

  // console.log(mapCenter);

  return (
    <div id="map_container">
      <div id='mai_info'>
        <h2>Adding an address</h2>
        <p>Select a point on the map or enter an address</p>
        <form onSubmit={handleSubmit}>
          <input ref={input} type="text" onChange={handleChangeInput} id="address_input" />
          <button id='search_btn' type="submit">Choose</button>
        </form>
      </div>
      <MapContainer
        id="map"
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <ChangeView center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          setZoom={setZoom}
          label={label}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
