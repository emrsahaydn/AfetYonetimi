const ResourcesList = ({ resources }) => {
  const getTypeColor = (type) => {
    const colors = {
      Gıda: 'bg-yellow-100 border-yellow-500',
      Tıbbi: 'bg-blue-100 border-blue-500',
      Barınma: 'bg-purple-100 border-purple-500',
      Ulaşım: 'bg-indigo-100 border-indigo-500',
    };
    return colors[type] || 'bg-gray-100 border-gray-500';
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Elimizdeki Kaynaklar</h2>
      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={`p-4 rounded-lg border-2 ${getTypeColor(resource.type)} shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{resource.name}</h3>
              <span className="px-2 py-1 rounded text-xs font-bold bg-gray-200 text-gray-700">
                {resource.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Konum:</span> {resource.location}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Miktar:</span> {resource.quantity}
            </p>
          </div>
        ))}
        {resources.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Kaynak bulunmamaktadır.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesList;

