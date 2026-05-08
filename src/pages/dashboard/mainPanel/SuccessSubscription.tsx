// import { Button } from "@/components/ui/button";
// import { usePaymentSuccessQuery } from "@/redux/features/subscription/subscriptionApi";
// import { useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function SuccessSubscription() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   const plan = params.get("plan") ?? "";

//   const { data, isSuccess, isError } = usePaymentSuccessQuery(plan, {
//     skip: !plan,
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Subscription activated! Welcome aboard.");
//     }
//     if (isError) {
//       toast.error("Something went wrong activating your plan. Please contact support.");
//     }
//   }, [isSuccess, isError, navigate]);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem" }}>
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Payment Successful 🎉</h1>
//       <p style={{ color: "#666" }}>Activating your <strong>{plan}</strong> plan…</p>
//       <Button
//         onClick={() => {
//           navigate(`/dashboard`);
//         }}
//       >
//         Go to Dashboard
//       </Button>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { usePaymentSuccessQuery } from "@/redux/features/subscription/subscriptionApi";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckCircle2, PartyPopper, ArrowRight, Sparkles, Loader2 } from "lucide-react";

export default function SuccessSubscription() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const plan = params.get("plan") ?? "";

  const { data, isSuccess, isError, isLoading } = usePaymentSuccessQuery(plan, {
    skip: !plan,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Subscription activated! Welcome aboard.");
    }
    if (isError) {
      toast.error("Something went wrong activating your plan. Please contact support.");
    }
  }, [isSuccess, isError]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FB] px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#ff8757]/5 blur-[120px]" />

      <div className="max-w-md w-full z-10">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 text-center relative overflow-hidden">
          
          {/* Confetti Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-[#ff8757] to-purple-500" />

          {/* Success Icon */}
          <div className="mb-8 relative inline-block">
            <div className="h-24 w-24 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500 rotate-12 transition-transform hover:rotate-0 duration-500">
              <PartyPopper size={48} strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-emerald-500 border-4 border-white">
              <CheckCircle2 size={24} fill="currentColor" className="text-white fill-emerald-500" />
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-3xl font-black text-[#210F37] mb-3 leading-tight">
            Welcome to the <span className="text-[#ff8757] capitalize">{plan}</span> Club!
          </h1>
          
          <div className="space-y-2 mb-10">
            <p className="text-gray-500 font-medium">
              Payment was successful. We are now prepping your workspace.
            </p>
            
            {/* Activation Status */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {isLoading ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <Loader2 size={14} className="animate-spin" />
                  Activating Plan...
                </div>
              ) : isSuccess ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} />
                  Plan Active
                </div>
              ) : null}
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => navigate(`/dashboard`)}
            className="w-full h-14 bg-[#210F37] hover:bg-[#ff8757] text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-[#210F37]/10 flex items-center justify-center gap-3 group"
          >
            Go to Dashboard
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="mt-6 text-xs text-gray-400 font-medium">
            Need help? <button className="text-[#210F37] hover:underline">Contact Support</button>
          </p>
        </div>

        {/* Small encouragement footer */}
        <p className="text-center mt-8 text-sm text-gray-400 flex items-center justify-center gap-2">
            Securely processed by <span className="font-bold text-gray-600">Stripe</span>
        </p>
      </div>
    </div>
  );
}