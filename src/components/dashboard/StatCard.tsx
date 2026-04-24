
export default function StatCard({ icon: Icon, label, value, onClick }) {
    return (
        <div
            className="group flex items-center justify-between rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 cursor-pointer border border-gray-100"
            onClick={onClick}
        >
            <div className="flex items-center gap-5">
                {/* Icon: Using a soft secondary color circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:bg-[#210F37]/15 group-hover:text-[#210F37]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col">
                    <p className="text-sm md:text-base 2xl:text-lg font-medium text-gray-500 transition-colors group-hover:text-gray-700">
                        {label}
                    </p>
                    <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#210F37] tracking-tight">
                        {value}
                    </h3>
                </div>
            </div>

            {/* Subtle Progress/Trend Indicator (UI Polish) */}
            <div className="h-1.5 w-1.5 rounded-full bg-gray-200 group-hover:bg-[#ff8757] transition-all duration-300 group-hover:scale-150" />
        </div>
    );
}