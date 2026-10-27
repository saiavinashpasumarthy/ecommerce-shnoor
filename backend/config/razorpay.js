import Razorpay from "razorpay";

console.log(
  "Razorpay Key Loaded:",
  Boolean(process.env.RAZORPAY_KEY_ID)
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;