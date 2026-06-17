export default function TicketTable({

  tickets,

  deleteTicket,

  navigate,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

      <div className="p-6 border-b border-slate-200">

        <h2 className="text-2xl font-bold text-slate-800">

          VAPT Tickets

        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Ticket Link
              </th>

              <th className="p-4 text-left">
                Created By
              </th>
			  
			  <th className="p-4 text-left">
                Primary Owner
              </th>
			  
			  <th className="p-4 text-left">
                Secondary Owner
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Vendor
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets?.map((ticket) => (

              <tr
                key={ticket.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >

                <td className="p-4">
                  {ticket.id}
                </td>

                <td className="p-4">

                  <a
                    href={ticket.ticketLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >

                    Open Ticket

                  </a>

                </td>

                <td className="p-4">

                  {ticket.ticketCreatedBy}

                </td>
				
				<td className="p-4">

                  {ticket.primaryOwner}

                </td>
				
				<td className="p-4">

                  {ticket.secondaryOwner}

                </td>

                <td className="p-4">

                  <span className="bg-slate-100 px-4 py-2 rounded-xl text-sm">

                    {ticket.status}

                  </span>

                </td>

                <td className="p-4">

                  {
                    ticket.vendor
                      ?.vendorName
                  }

                </td>

                <td className="p-4">

                  <div className="flex gap-3">

                    <button
                      onClick={() =>

                        navigate(
                          "/ticket-form",
                          {
                            state: {
                              ticket,
                            },
                          }
                        )
                      }
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-xl"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        deleteTicket(ticket.id)
                      }
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-5 py-2 rounded-xl"
                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}