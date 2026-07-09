import { personalInfo } from "../data/personalInfo";

export const openMail = (subject = "", body = "") => {
  const email = personalInfo.email;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, "_blank");
};
