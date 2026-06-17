import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import API from "../api/api";

export default function DashboardCharts() {

  const [stats, setStats] = useState({

    openTickets: 0,

    inProgressTickets: 0,

    closedTickets: 0,
  });

  const [vendorData, setVendorData]
    = useState([]);

  useEffect(() => {

    fetchStats();

    fetchVendorStats();
	
	fetchSecondaryOwnerReport();
	
	fetchAgingReport();

  }, []);

  const fetchStats = async () => {

    try {

      const response =
        await API.get(
          "/dashboard/stats"
        );

      setStats(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchVendorStats = async () => {

    try {

      const response =
        await API.get(
          "/dashboard/vendors"
        );

      setVendorData(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const statusData = [

    {
      name: "OPEN",
      value: stats.openTickets || 0,
    },

    {
      name: "IN_PROGRESS",
      value:
        stats.inProgressTickets || 0,
    },

    {
      name: "CLOSED",
      value:
        stats.closedTickets || 0,
    },
  ];

	const COLORS = [

	  "#93c5fd", // pastel blue

	  "#fdba74", // pastel orange

	  "#86efac", // pastel green

	  "#c4b5fd", // pastel purple

	  "#f9a8d4", // pastel pink

	];
  
  const [secondaryOwnerData, setSecondaryOwnerData] = useState([]);
  
  const [agingData,setAgingData] = useState([]);
  
  const fetchSecondaryOwnerReport =
	  async () => {

		try {

		  const response =
			await API.get(

			  "/dashboard/secondary-owner-report"
			);

		  setSecondaryOwnerData(
			response.data
		  );

		} catch (error) {

		  console.error(error);
		}
	};
	
	const fetchAgingReport =
	  async () => {

		try {

		  const response =
			await API.get(

			  "/dashboard/aging-report"
			);

		  setAgingData(
			response.data
		  );

		} catch (error) {

		  console.error(error);
		}
	};

  return (

  <div>

    {/* KPI CARDS */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* OPEN */}

      <div className="bg-blue-100 border border-blue-200 rounded-3xl p-8 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">

        <h2 className="text-lg font-semibold mb-3 text-blue-800">

          Open Tickets

        </h2>

        <p className="text-5xl font-bold text-blue-900">

          {stats.openTickets}

        </p>

      </div>

      {/* IN PROGRESS */}

      <div className="bg-orange-100 border border-orange-200 rounded-3xl p-8 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">

        <h2 className="text-lg font-semibold mb-3 text-orange-800">

          In Progress

        </h2>

        <p className="text-5xl font-bold text-orange-900">

          {stats.inProgressTickets}

        </p>

      </div>

      {/* CLOSED */}

      <div className="bg-emerald-100 border border-emerald-200 rounded-3xl p-8 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">

        <h2 className="text-lg font-semibold mb-3 text-emerald-800">

          Closed Tickets

        </h2>

        <p className="text-5xl font-bold text-emerald-900">

          {stats.closedTickets}

        </p>

      </div>

    </div>

    {/* CHARTS */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

      {/* PIE CHART */}

      <div className="bg-white rounded-3xl shadow-md p-8 border border-slate-200">

        <h2 className="text-2xl font-bold text-slate-700 mb-6">

          Ticket Status Distribution

        </h2>

        <div className="h-96">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >

                {statusData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* AGING REPORT */}

      <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200">

        <h2 className="text-2xl font-bold mb-6 text-slate-700">

          Ticket Aging Report

        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={agingData}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="agingBucket" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              fill="#fdba74"
              dataKey="ticketCount"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* VENDOR REPORT */}

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">

        <h2 className="text-2xl font-bold text-slate-700 mb-6">

          Vendor Wise Tickets

        </h2>

        <div className="h-96">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
			  data={vendorData}
			>

			  <CartesianGrid strokeDasharray="3 3" />

			  <XAxis dataKey="vendorName" />

			  <YAxis />

			  <Tooltip />

			  <Legend />

			  <Bar
				dataKey="open"
				stackId="a"
				fill="#93c5fd"
			  />

			  <Bar
				dataKey="in_PROGRESS"
				stackId="a"
				fill="#fdba74"
			  />

			  <Bar
				dataKey="closed"
				stackId="a"
				fill="#86efac"
			  />

			</BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* SECONDARY OWNER REPORT */}

      <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200">

        <h2 className="text-2xl font-bold mb-6 text-slate-700">

          Secondary Owner Report

        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
			  data={secondaryOwnerData}
			>

			  <CartesianGrid strokeDasharray="3 3" />

			  <XAxis
				dataKey="secondaryOwner"
			  />

			  <YAxis />

			  <Tooltip />

			  <Legend />

			  <Bar
				dataKey="open"
				stackId="a"
				fill="#93c5fd"
			  />

			  <Bar
				dataKey="in_PROGRESS"
				stackId="a"
				fill="#fdba74"
			  />

			  <Bar
				dataKey="closed"
				stackId="a"
				fill="#86efac"
			  />

			</BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  </div>
);
}