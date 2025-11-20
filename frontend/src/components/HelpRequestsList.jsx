import { useDispatch } from 'react-redux';

const HelpRequestsList = ({ helpRequests }) => {
  const dispatch = useDispatch();

  const getStatusColor = (status) => {
    if (status === 'Kritik') return 'bg-red-100 border-red-500';
    if (status === 'Yardım Bekleniyor') return 'bg-yellow-100 border-yellow-500';
    return 'bg-green-100 border-green-500';
  };

  const getStatusTextColor = (status) => {
    if (status === 'Kritik') return 'text-red-700';
    if (status === 'Yardım Bekleniyor') return 'text-yellow-700';
    return 'text-green-700';
  };

  const updateStatus = (id, newStatus) => {
    const request = helpRequests.find((r) => r.id === id);
    if (request) {
      dispatch({
        type: 'UPDATE_HELP_REQUEST',
        payload: { ...request, status: newStatus },
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Aktif Yardım Talepleri</h2>
      <div className="space-y-3">
        {helpRequests.map((request) => (
          <div
            key={request.id}
            className={`p-4 rounded-lg border-2 ${getStatusColor(request.status)} shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{request.title}</h3>
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${getStatusTextColor(request.status)}`}
              >
                {request.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Konum:</span> {request.location}
            </p>
            <p className="text-sm text-gray-700 mb-3">{request.description}</p>
            {request.categories && request.categories.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-1">
                  <span className="font-medium">Kategoriler:</span>
                </p>
                <div className="flex flex-wrap gap-1">
                  {request.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 mt-3">
              {request.status === 'Kritik' && (
                <button
                  onClick={() => updateStatus(request.id, 'Yardım Bekleniyor')}
                  className="flex-1 bg-yellow-500 text-white text-xs py-1 px-2 rounded hover:bg-yellow-600 transition-colors"
                >
                  Yardım Yola Çıktı
                </button>
              )}
              {request.status === 'Yardım Bekleniyor' && (
                <button
                  onClick={() => updateStatus(request.id, 'Güvende')}
                  className="flex-1 bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 transition-colors"
                >
                  Yardım Gitti
                </button>
              )}
            </div>
          </div>
        ))}
        {helpRequests.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Aktif yardım talebi bulunmamaktadır.
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequestsList;
