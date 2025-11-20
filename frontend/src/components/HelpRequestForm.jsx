import { useState } from 'react';
import { useDispatch } from 'react-redux';

const HelpRequestForm = ({ onSuccess }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const parseMessage = (text) => {
    const lowerText = text.toLowerCase();
    const categories = [];
    const needs = [];

    const categoryKeywords = {
      su: ['su', 'içecek', 'su ihtiyacı'],
      yiyecek: ['yiyecek', 'gıda', 'yemek', 'ekmek', 'yemek ihtiyacı'],
      sağlık: ['sağlık', 'ilaç', 'tıbbi', 'doktor', 'hastane', 'tedavi'],
      barınma: ['barınma', 'çadır', 'battaniye', 'yatak', 'ev', 'konut'],
    };

    Object.keys(categoryKeywords).forEach((category) => {
      categoryKeywords[category].forEach((keyword) => {
        if (lowerText.includes(keyword)) {
          if (!categories.includes(category)) {
            categories.push(category);
          }
        }
      });
    });

    const specialNeeds = ['battaniye', 'çadır', 'ilaç', 'su', 'yiyecek', 'ekmek'];
    specialNeeds.forEach((need) => {
      if (lowerText.includes(need) && !needs.includes(need)) {
        needs.push(need);
      }
    });

    return { categories, needs };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const { categories, needs } = parseMessage(message);
    
    const trabzonCenter = { lat: 41.0015, lon: 39.7178 };
    const lat = trabzonCenter.lat + (Math.random() - 0.5) * 0.1;
    const lon = trabzonCenter.lon + (Math.random() - 0.5) * 0.1;

    const newRequest = {
      id: Date.now(),
      title: categories.length > 0 
        ? categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')
        : 'Yardım Talebi',
      location: 'Trabzon',
      status: 'Kritik',
      lat: lat,
      lon: lon,
      description: message,
      categories: categories,
      needs: needs,
    };

    dispatch({ type: 'ADD_HELP_REQUEST', payload: newRequest });
    setMessage('');
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Yardım Talebi Oluştur</h1>
          <p className="text-sm text-gray-600">İhtiyacınızı belirtin, size yardımcı olalım</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İhtiyacınızı açıklayın
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Örn: Su ve battaniye istiyorum"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
              rows="5"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-blue-800 mb-1">Kategoriler:</p>
            <p className="text-xs text-blue-600">Su • Yiyecek • Sağlık • Barınma</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 px-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
          >
            Yardım Talebi Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpRequestForm;
