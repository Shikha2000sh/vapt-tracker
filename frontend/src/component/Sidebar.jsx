import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Sidebar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  const menu = [

    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Tickets",
      path: "/tickets",
    },

    {
      name: "Add Ticket",
      path: "/ticket-form",
    },
  ];

  return (

    <aside className="w-72 bg-slate-900 text-white min-h-screen flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold">

          VAPT Tracker

        </h1>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-6 space-y-3">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`block px-5 py-4 rounded-2xl transition-all duration-200 font-medium ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >

            {item.name}

          </Link>

        ))}

      </nav>

      {/* Logout */}

      <div className="p-6 border-t border-slate-800">

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold transition-all"
        >

          Logout

        </button>

      </div>

    </aside>
  );
}