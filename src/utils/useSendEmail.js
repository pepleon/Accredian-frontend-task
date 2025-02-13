import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./constants";




const useSendEmail = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendEmail = async (to, subject, text) => {
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(BASE_URL+"send-email", {
        to,
        subject,
        text,
      });

      if (res.status === 200) {
        setSuccess("Email sent successfully!");
      }
    } catch (err) {
      setError("Failed to send email. Please try again later.");
    }
  };

  return { sendEmail, error, success };
};

export default useSendEmail;
