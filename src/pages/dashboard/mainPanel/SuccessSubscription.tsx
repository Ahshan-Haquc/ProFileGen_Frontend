import { Button } from "@/components/ui/button";
import { usePaymentSuccessQuery } from "@/redux/features/subscription/subscriptionApi";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SuccessSubscription() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const plan = params.get("plan") ?? "";

  const { data, isSuccess, isError } = usePaymentSuccessQuery(plan, {
    skip: !plan,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Subscription activated! Welcome aboard.");
    }
    if (isError) {
      toast.error("Something went wrong activating your plan. Please contact support.");
    }
  }, [isSuccess, isError, navigate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Payment Successful 🎉</h1>
      <p style={{ color: "#666" }}>Activating your <strong>{plan}</strong> plan…</p>
      <Button
        onClick={() => {
          navigate(`/dashboard`);
        }}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}