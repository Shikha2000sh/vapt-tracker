export default function Navbar() {

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center mb-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Security Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Vulnerability Assessment & Penetration Testing
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          A
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            Admin User
          </p>

          <p className="text-sm text-slate-500">
            admin@test.com
          </p>
        </div>

      </div>

    </div>
  );
}