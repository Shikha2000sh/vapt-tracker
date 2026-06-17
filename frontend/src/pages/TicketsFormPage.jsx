import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import API from "../api/api";

export default function TicketFormPage() {

  const navigate = useNavigate();

  const location = useLocation();
  
  const [auditLogs,setAuditLogs] = useState([]);

  const editTicket =
    location.state?.ticket;

  const [vendors, setVendors]
    = useState([]);

  const [editTicketId,
    setEditTicketId]
      = useState(null);
  const handleBulkUpload =
	  async (e) => {

		const file =
		  e.target.files[0];

		const formData =
		  new FormData();

		formData.append(
		  "file",
		  file
		);

		try {

		  await API.post(

			"/tickets/bulk-upload",

			formData,

			{

			  headers: {

				"Content-Type":
				  "multipart/form-data"
			  }
			}
		  );

		  alert(
			"Upload Successful"
		  );

		} catch (error) {

		  console.error(error);
		}
	};

  const [formData, setFormData]
    = useState({

      ticketLink: "",

      ticketCreatedBy: "",

      primaryOwner: "",

      secondaryOwner: "",

      status: "OPEN",

      vendorId: "",

      file: null,
    });

  useEffect(() => {

    fetchVendors();

    if (editTicket) {

      setEditTicketId(
        editTicket.id
      );
	  setAuditLogs(
		  editTicket.auditLogList || []
	  );

      setFormData({

        ticketLink:
          editTicket.ticketLink || "",

        ticketCreatedBy:
          editTicket.ticketCreatedBy || "",
		
		primaryOwner:
          editTicket.primaryOwner || "",
		
		secondaryOwner:
          editTicket.secondaryOwner || "",

        status:
          editTicket.status || "OPEN",
		  
		reportPath:
		  editTicket.reportPath || "",

        vendorId:
          String(
            editTicket.vendor?.id || ""
          ),

        file: null,
      });
    }

  }, []);

  const fetchVendors = async () => {

    try {

      const response =
        await API.get("/vendors");

      setVendors(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleChange = (e) => {

    const { name, value }
      = e.target;

    setFormData({

      ...formData,

      [name]: value,
    });
  };

  const handleFileChange = (e) => {

    setFormData({

      ...formData,

      file: e.target.files[0],
    });
  };

  const createTicket = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "ticketLink",
        formData.ticketLink
      );

      data.append(
        "ticketCreatedBy",
        formData.ticketCreatedBy
      );

      data.append(
        "primaryOwner",
        formData.primaryOwner
      );

      data.append(
        "secondaryOwner",
        formData.secondaryOwner
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "vendorId",
        formData.vendorId
      );

      if (formData.file) {

        data.append(
          "file",
          formData.file
        );
      }

      await API.post(
        "/tickets",
        data
      );

      alert(
        "Ticket Created Successfully"
      );

      navigate("/tickets");

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Create Ticket"
      );
    }
  };

  const updateTicket = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "ticketLink",
        formData.ticketLink
      );

      data.append(
        "ticketCreatedBy",
        formData.ticketCreatedBy
      );

      data.append(
        "primaryOwner",
        formData.primaryOwner
      );

      data.append(
        "secondaryOwner",
        formData.secondaryOwner
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "vendorId",
        formData.vendorId
      );

      if (formData.file) {

        data.append(
          "file",
          formData.file
        );
      }

      await API.post(
        `/tickets/update/${editTicketId}`,
        data
      );

      alert(
        "Ticket Updated Successfully"
      );

      navigate("/tickets");

    } catch (error) {

      console.error(error);

      alert("Update Failed");
    }
  };

  return (

    <div className="p-8">

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200 max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-slate-800">

            {
              editTicketId
                ? "Edit VAPT Ticket"
                : "Create VAPT Ticket"
            }

          </h2>

          <button
            onClick={() =>
              navigate("/tickets")
            }
            className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-2xl"
          >

            Back

          </button>
		  
		  <input
			  type="file"
			  accept=".xlsx"
			  onChange={handleBulkUpload}
			/>

        </div>

        <form
          onSubmit={
            editTicketId
              ? updateTicket
              : createTicket
          }
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              name="ticketLink"
              placeholder="Ticket Link"
              value={formData.ticketLink}
              onChange={handleChange}
              className="border border-slate-300 p-4 rounded-2xl"
            />

            <input
              type="text"
              name="ticketCreatedBy"
              placeholder="Ticket Created By"
              value={formData.ticketCreatedBy}
              onChange={handleChange}
              className="border border-slate-300 p-4 rounded-2xl"
            />
			
			<input
              type="text"
              name="primaryOwner"
              placeholder="Primary Owner"
              value={formData.primaryOwner}
              onChange={handleChange}
              className="border border-slate-300 p-4 rounded-2xl"
            />
			
			<input
              type="text"
              name="secondaryOwner"
              placeholder="Secondary Owner"
              value={formData.secondaryOwner}
              onChange={handleChange}
              className="border border-slate-300 p-4 rounded-2xl"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-slate-300 p-4 rounded-2xl"
            >

              <option value="OPEN">
                OPEN
              </option>

              <option value="IN_PROGRESS">
                IN_PROGRESS
              </option>

              <option value="CLOSED">
                CLOSED
              </option>

            </select>

            <select
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              className="border border-slate-300 p-4 rounded-2xl"
            >

              <option value="">
                Select Vendor
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

            <div className="flex flex-col gap-2">

			  <input
				type="file"
				onChange={handleFileChange}
				className="border border-slate-300 p-4 rounded-2xl"
			  />
			  {formData.reportPath && (

				<p className="text-sm text-slate-600 break-all">

				  Selected File:
				  {" "}
				  {formData.reportPath}

				</p>

			  )}

			</div>
          </div>

          <div className="mt-8 flex gap-4">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold"
            >

              {
                editTicketId
                  ? "Update Ticket"
                  : "Create Ticket"
              }

            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/tickets")
              }
              className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-8 py-4 rounded-2xl font-semibold"
            >

              Cancel

            </button>

          </div>

        </form>

      </div>
	  
		{/* AUDIT LOGS */}

		{editTicketId && (

		  <div className="mt-10">

			<div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

			  <h2 className="text-2xl font-bold text-slate-800 mb-6">

				Audit Logs

			  </h2>

			  <div className="space-y-4">

				{auditLogs.length === 0 && (

				  <p className="text-slate-500">

					No audit logs found.

				  </p>

				)}

				{auditLogs.map((log) => (

				  <div
					key={log.id}
					className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
				  >

					<div className="flex justify-between items-start">

					  <div>

						<p className="font-semibold text-slate-800">

						  {log.action}

						</p>

						<p className="text-sm text-slate-600 mt-1">

						  By:
						  {" "}
						  {log.createdBy}

						</p>

					  </div>
					  
					  <div className="text-sm text-slate-500">

						{log.status}

					  </div>

					  <div className="text-sm text-slate-500">

						{log.createdAt}

					  </div>

					</div>

				  </div>

				))}

			  </div>

			</div>

		  </div>

		)}
		

    </div>
  );
}