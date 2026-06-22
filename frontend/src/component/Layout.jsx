import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex bg-slate-100 h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
