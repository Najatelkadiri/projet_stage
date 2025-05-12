import { useState } from "react";
import { X, Menu, Search, Bell, Inbox, TrendingUp, Activity, PieChart, BarChart2 } from "react-feather";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = [
    { title: "Total des ventes", value: "120,000 DZD", trend: "up", change: "+5%" },
    { title: "Achats du mois", value: "80,000 DZD", trend: "down", change: "-3%" },
    { title: "Nombre de clients", value: "25", trend: "up", change: "+2%" },
    { title: "Commandes passées", value: "75", trend: "down", change: "-1%" }
  ];

  const recentActivity = [
    { user: "Client A", action: "a passé une commande", target: "Commande #A123", time: "2 minutes ago" },
    { user: "Client B", action: "a effectué un paiement", target: "Facture #F456", time: "1 hour ago" },
    { user: "Client C", action: "a ajouté un article", target: "Ciment 50kg", time: "3 hours ago" },
  ];

  return (
    <div>
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'md:ms-64' : ''}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between ">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="flex-1 flex items-center justify-between">
              {/* Search */}
              <div className="max-w-lg w-full lg:max-w-xs ml-4 md:ml-0">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>

              {/* Header Right */}
              <div className=" flex items-center md:ml-6">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <Activity className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  <span className="ml-2 text-gray-500">from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
                <button className="text-sm text-gray-500 hover:text-gray-700">View All</button>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <PieChart className="h-32 w-32 text-gray-400" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">User Activity</h2>
                <button className="text-sm text-gray-500 hover:text-gray-700">View All</button>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <BarChart2 className="h-32 w-32 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <button className="text-sm text-gray-500 hover:text-gray-700">View All</button>
              </div>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== recentActivity.length - 1 && (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                              <Inbox className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">{activity.user}</span>
                                {' '}{activity.action}{' '}
                                <span className="font-medium text-gray-900">{activity.target}</span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
