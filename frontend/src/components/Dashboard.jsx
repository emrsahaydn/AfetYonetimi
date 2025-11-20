import { useSelector } from 'react-redux';
import HelpRequestsList from './HelpRequestsList';
import ResourcesList from './ResourcesList';
import Map from './Map';

const Dashboard = () => {
  const { helpRequests, resources } = useSelector((state) => state.dashboard);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <div className="w-1/4 bg-white shadow-lg overflow-y-auto">
        <HelpRequestsList helpRequests={helpRequests} />
      </div>

      <div className="flex-1 bg-gray-50">
        <Map helpRequests={helpRequests} resources={resources} />
      </div>

      <div className="w-1/4 bg-white shadow-lg overflow-y-auto">
        <ResourcesList resources={resources} />
      </div>
    </div>
  );
};

export default Dashboard;
