import { usePaymentSuccessQuery } from "@/redux/features/subscription/subscriptionApi";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SuccessSubscription() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const plan = params.get("plan");

    const {data} = usePaymentSuccessQuery(plan);
    

  }, []);

  return <h1>Payment Successful 🎉</h1>;
}