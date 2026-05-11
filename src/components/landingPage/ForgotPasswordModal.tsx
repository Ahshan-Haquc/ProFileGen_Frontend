import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  KeyRound,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import toastShow from "@/utils/toastShow";
import { useForgotPasswordRequestMutation, useResetPasswordMutation, useVerifyOtpMutation } from "@/redux/features/auth/authApi";

const ForgotPasswordModal = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });

  // RTK Query Hooks
  const [requestOtp, { isLoading: isRequesting }] = useForgotPasswordRequestMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const handleNextStep = async () => {
    try {
      if (step === 1) {
        const res = await requestOtp({ email }).unwrap();
        if(!res.success){
          return toastShow(res.message, "error");
        }
        setStep(2);
      } else if (step === 2) {
        const res = await verifyOtp({ email, otp }).unwrap();
        if(!res.success){
          return toastShow(res.message, "error");
        }
        setStep(3);
      } else if (step === 3) {
        if(passwords.new.length<6 || passwords.confirm.length<6) return toastShow("Passwords must be at least 6 characters long", "error");
        if (passwords.new !== passwords.confirm) {
          return toastShow("Passwords do not match", "error");
        }
        const res = await resetPassword({ email, otp, password: passwords.new }).unwrap();
        if(!res.success){
          return toastShow(res.message, "error");
        }
        setStep(4);
      }
    } catch (err) {
      toastShow(err?.data?.message || "Operation failed", "error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8">

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#ff8757]">
                <Mail size={32} />
              </div>
              <DialogTitle className="text-2xl font-black text-[#210F37]">Reset Password</DialogTitle>
              <p className="text-gray-500 text-sm mt-2">Enter your email to receive a 6-digit code.</p>
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-[#210F37]">Email Address</Label>
              <Input
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-gray-200"
              />
            </div>
            <Button onClick={handleNextStep} className="w-full h-12 bg-[#210F37] hover:bg-[#ff8757] rounded-xl font-bold" disabled={isRequesting}>
              {isRequesting ? <Loader2 className="animate-spin mr-2" /> : "Send Code"}
            </Button>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#210F37]">
                <KeyRound size={32} />
              </div>
              <DialogTitle className="text-2xl font-black text-[#210F37]">
                Verify Code
              </DialogTitle>
              <p className="text-gray-500 text-sm mt-2">
                We sent a 6-digit code to{" "}
                <span className="font-bold text-[#210F37]">{email}</span>
              </p>
            </div>

            {/* Centered OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="h-12 w-10 sm:w-12 rounded-xl border-[#210F37]/20" />
                  <InputOTPSlot index={1} className="h-12 w-10 sm:w-12 rounded-xl border-[#210F37]/20" />
                  <InputOTPSlot index={2} className="h-12 w-10 sm:w-12 rounded-xl border-[#210F37]/20" />
                  <InputOTPSlot index={3} className="h-12 w-10 sm:w-12 rounded-xl border-[#210F37]/20" />
                  <InputOTPSlot index={4} className="h-12 w-10 sm:w-12 rounded-xl border-[#210F37]/20" />
                  <InputOTPSlot index={5} className="h-12 w-10 sm:w-12 rounded-xl border-[#210F37]/20" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleNextStep}
                className="w-full h-12 bg-[#210F37] hover:bg-[#ff8757] rounded-xl font-bold transition-all"
                disabled={isVerifying || otp.length < 6}
              >
                {isVerifying ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <p className="text-center text-xs text-gray-400">
                Didn't receive the code?{" "}
                <button
                  onClick={() => setStep(1)}
                  className="text-[#ff8757] font-bold hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Lock size={32} />
              </div>
              <DialogTitle className="text-2xl font-black text-[#210F37]">New Password</DialogTitle>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-bold">New Password</Label>
                <Input type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Confirm Password</Label>
                <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="h-12 rounded-xl" />
              </div>
            </div>
            <Button onClick={handleNextStep} className="w-full h-12 bg-[#210F37] hover:bg-[#ff8757] rounded-xl font-bold" disabled={isResetting}>
              {isResetting ? <Loader2 className="animate-spin mr-2" /> : "Reset Password"}
            </Button>
          </div>
        )}

        {/* Step 4: Final Success/Status */}
        {step === 4 && (
          <div className="py-6 text-center space-y-6">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-in zoom-in">
              <CheckCircle2 size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#210F37]">Password Updated!</h3>
              <p className="text-gray-500 mt-2">Your security is our priority. You can now log in with your new password.</p>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold">
              Return to Login
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;