let otpStore = {}; // Local OTP store

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// SEND OTP (no alert, returns otp)
export const sendOtpAPI = async (identifier) => {
  const otp = generateOTP();
  otpStore[identifier] = otp;

  return { success: true, otp }; // return otp for UI card
};

// VERIFY OTP
export const verifyOtpAPI = async (identifier, otp) => {
  if (otpStore[identifier] === otp) {
    delete otpStore[identifier];
    return { success: true };
  }
  return { success: false };
};
