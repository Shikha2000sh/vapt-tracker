import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import * as XLSX from "xlsx";

import API from "../api/api";

import TicketTable
from "../component/TicketTable";

export default function TicketsPage() {

  const navigate = useNavigate();

  const [tickets, setTickets]
    = useState([]);

  const [vendors, setVendors]
    = useState([]);

  const [page, setPage]
    = useState(0);

  const [totalPages,
    setTotalPages]
      = useState(0);

  const [filters, setFilters]
    = useState({

      status: "",

      vendorId: "",

      search: "",
	  
	  primaryOwner: "",
	  
	  secondaryOwner: "",
    });

  useEffect(() => {

    fetchTickets();

    fetchVendors();

  }, [page, filters]);

 const fetchTickets = async () => {

	  try {

		const params =
		  new URLSearchParams();

		params.append(
		  "page",
		  page
		);

		params.append(
		  "size",
		  10
		);

		if (filters.status) {

		  params.append(
			"status",
			filters.status
		  );
		}

		if (filters.vendorId) {

		  params.append(
			"vendorId",
			filters.vendorId
		  );
		}

		if (filters.search) {

		  params.append(
			"search",
			filters.search
		  );
		}

		if (filters.primaryOwner) {

		  params.append(
			"primaryOwner",
			filters.primaryOwner
		  );
		}

		if (filters.secondaryOwner) {

		  params.append(
			"secondaryOwner",
			filters.secondaryOwner
		  );
		}

		const response =
		  await API.get(

			`/tickets?${params.toString()}`
		  );

		setTickets(
		  response.data.content
		);

		setTotalPages(
		  response.data.totalPages
		);

	  } catch (error) {

		console.error(error);
	  }
	};
  const fetchVendors = async () => {

    try {

      const response =
        await API.get("/vendors");

      setVendors(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const deleteTicket = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this ticket?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/tickets/${id}`
      );

      fetchTickets();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");
    }
  };

  const handleFilterChange = (e) => {

    const { name, value }
      = e.target;

    setPage(0);

    setFilters({

      ...filters,

      [name]: value,
    });
  };

  const resetFilters = () => {

    setFilters({

      status: "",

      vendorId: "",

      search: "",
	  
	  primaryOwner: "",
	  
	  secondaryOwner: "",
    });

    setPage(0);
  };

  const downloadExcel = () => {

    const exportData = tickets.map(
      (ticket) => ({

        ID: ticket.id,

        TicketLink:
          ticket.ticketLink,

        CreatedBy:
          ticket.ticketCreatedBy,
		  
		PrimaryOwner:
          ticket.primaryOwner,
		  
		SecondaryOwner:
          ticket.secondaryOwner,

        Status:
          ticket.status,

        Vendor:
          ticket.vendor
            ?.vendorName,

        CreatedAt:
          ticket.createdAt,
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      "Tickets"
    );

    XLSX.writeFile(

      workbook,

      "VAPT_Tickets.xlsx"
    );
  };

  return (

    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          Tickets

        </h1>

        <div className="flex gap-4">

          <button
            onClick={downloadExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg"
          >

            Download Excel

          </button>

          <button
            onClick={() =>
              navigate("/ticket-form")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg"
          >

            + Add Ticket

          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-slate-200">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Search */}

          <input
            type="text"
            name="search"
            placeholder="Search Created By"
            value={filters.search}
            onChange={handleFilterChange}
            className="border border-slate-300 p-4 rounded-2xl"
          />
		  
		  {/* Primary Owner */}

          <input
            type="text"
            name="primaryOwner"
            placeholder="Search Primary Owner"
            value={filters.primaryOwner}
            onChange={handleFilterChange}
            className="border border-slate-300 p-4 rounded-2xl"
          />
		  
		  {/* Secondary Owner */}

          <input
            type="text"
            name="secondaryOwner"
            placeholder="Search Secondary Owner"
            value={filters.secondaryOwner}
            onChange={handleFilterChange}
            className="border border-slate-300 p-4 rounded-2xl"
          />

          {/* Status */}

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border border-slate-300 p-4 rounded-2xl"
          >

            <option value="">
              All Status
            </option>

            <option value="OPEN">
              OPEN
            </option>

            <option value="IN_PROGRESS">
              TESTING_IN_PROGRESS
            </option>

            <option value="CLOSED">
              CLOSED
            </option>

          </select>

          {/* Vendor */}

          <select
            name="vendorId"
            value={filters.vendorId}
            onChange={handleFilterChange}
            className="border border-slate-300 p-4 rounded-2xl"
          >

            <option value="">
              All Vendors
            </option>

            {vendors.map((vendor) => (

              <option
                key={vendor.id}
                value={vendor.id}
              >

                {vendor.vendorName}

              </option>

            ))}

          </select>

          {/* Reset */}

          <button
            onClick={resetFilters}
            className="bg-slate-200 hover:bg-slate-300 rounded-2xl font-semibold"
          >

            Reset Filters

          </button>

        </div>

      </div>

      {/* Table */}

      <TicketTable
        tickets={tickets}
        deleteTicket={deleteTicket}
        navigate={navigate}
      />

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-8">

        <button

          disabled={page === 0}

          onClick={() =>
            setPage(page - 1)
          }

          className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-xl disabled:opacity-50"
        >

          Previous

        </button>

        <span className="font-semibold">

          Page {page + 1} of {totalPages}

        </span>

        <button

          disabled={page === totalPages - 1}

          onClick={() =>
            setPage(page + 1)
          }

          className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-xl disabled:opacity-50"
        >

          Next

        </button>

      </div>

    </div>
  );
}