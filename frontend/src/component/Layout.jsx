import Sidebar
from "./Sidebar";

export default function Layout({

  children,

}) {

  return (

    <div className="flex bg-slate-100 min-h-screen">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <main className="flex-1 overflow-y-auto">

        {children}

      </main>

    </div>
  );
}