import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createCustomIcon = (status) => {
  let color = '#3b82f6';
  
  if (status === 'Kritik') {
    color = '#ef4444';
  } else if (status === 'Yardım Bekleniyor') {
    color = '#eab308';
  } else if (status === 'Güvende') {
    color = '#22c55e';
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const Map = ({ helpRequests, resources }) => {
  const trabzonCenter = [41.0015, 39.7178];

  return (
    <div className="h-full w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 px-2">Trabzon Haritası</h2>
      <div className="relative w-full h-[calc(100%-4rem)] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={trabzonCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {helpRequests.map((request) => {
            if (!request.lat || !request.lon) return null;

            return (
              <Marker
                key={`request-${request.id}`}
                position={[request.lat, request.lon]}
                icon={createCustomIcon(request.status)}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-1">{request.title}</h3>
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">Durum:</span> {request.status}
                    </p>
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">Konum:</span> {request.location}
                    </p>
                    <p className="text-xs text-gray-700">{request.description}</p>
                    {request.categories && request.categories.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-600 mb-1">Kategoriler:</p>
                        <div className="flex flex-wrap gap-1">
                          {request.categories.map((cat, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {resources.map((resource) => {
            if (!resource.lat || !resource.lon) return null;

            return (
              <Marker
                key={`resource-${resource.id}`}
                position={[resource.lat, resource.lon]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div style="
                    background-color: #3b82f6;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  "></div>`,
                  iconSize: [16, 16],
                  iconAnchor: [8, 8],
                })}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-1">{resource.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">Tip:</span> {resource.type}
                    </p>
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">Miktar:</span> {resource.quantity}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Konum:</span> {resource.location}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
