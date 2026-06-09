export const LoginPage = () => {
  return (
    <div className="flex h-screen w-full bg-white">
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 flex flex-col gap-8">
          <h1 className="text-[44px] font-bold text-[#3a3543] tracking-tight leading-tight">
            Iniciar sesion
          </h1>

          <form className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-medium text-[#8a8a8a]">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dcdcdc] focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            {/* Input de Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-medium text-[#8a8a8a]">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dcdcdc] focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#634b9f] text-white py-3.5 rounded-xl font-black text-xl italic tracking-wider uppercase shadow-md hover:bg-[#523d85] transition-all"
            >
              Iniciar sesion
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:flex flex-1 bg-white">
        <div className="w-full h-full bg-[#634b9f] rounded-l-4xl overflow-hidden flex items-center justify-center relative">
          <img
            src="/auth/inventory_system_login.png"
            alt="Warehouse illustration"
            className="w-full h-full object-cover mix-blend-luminosity opacity-40 p-10"
          />
        </div>
      </div>
    </div>
  );
};
