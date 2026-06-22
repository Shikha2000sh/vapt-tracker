export default function VAPTTracker() {
  const vendors = [
    "TCS",
    "Infosys",
    "Wipro",
    "HCL",
    "Accenture",
    "Cognizant",
  ];

  const statusColors = {
    Open: "bg-red-100 text-red-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Closed: "bg-green-100 text-green-700",
  };

  const sampleData = [
    {
      id: 1,
      ticket: "https://jira.company.com/VAPT-101",
      vendor: "TCS",
      status: "Open",
      file: "network_report.pdf",
    },
    {
      id: 2,
      ticket: "https://jira.company.com/VAPT-102",
      vendor: "Infosys",
      status: "In Progress",
      file: "webapp_scan.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            VAPT Tracker
          </h1>
          <p className="text-slate-500 mt-2">
            Track Vulnerability Assessment & Penetration Testing tickets.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-700">
            Add New VAPT Ticket
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Ticket Link
              </label>
              <input
                type="url"
                placeholder="https://jira.company.com/VAPT-001"
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Assigned Vendor
              </label>
              <select className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Select Vendor</option>
                <option>Net Access</option>
                {/* {vendors.map((vendor) => (
                  <option key={vendor}>{vendor}</option>
                ))} */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Status
              </label>
              <select className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Upload PDF Report
              </label>
              <input
                type="file"
                accept="application/pdf"
                className="w-full border border-slate-300 rounded-xl p-3 bg-white"
              />
            </div>
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all shadow-md">
            Save Ticket
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-700">
              VAPT Tickets
            </h2>

            <input
              type="text"
              placeholder="Search tickets..."
              className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="p-4 rounded-l-2xl">Ticket Link</th>
                <th className="p-4">Vendor</th>
                <th className="p-4">Status</th>
                <th className="p-4">PDF Report</th>
                <th className="p-4 rounded-r-2xl">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sampleData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="p-4">
                    <a
                      href={item.ticket}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open Ticket
                    </a>
                  </td>

                  <td className="p-4">{item.vendor}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600">{item.file}</td>

                  <td className="p-4 flex gap-2">
                    <button className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-xl text-sm">
                      Edit
                    </button>

                    <button className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
