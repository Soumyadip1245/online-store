import nodemailer from "nodemailer";

export default async ({ req, res, log, error }) => {
  const jsonBody = JSON.parse(req.body)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: "bizabledproject@gmail.com",
      pass: "vctaffqirjugpnzz",
    },
  });
  const info = await transporter.sendMail({
    from: 'bizabledproject@gmail.com', 
    to: jsonBody.to, 
    subject: jsonBody.subject, 
    html: jsonBody.html, 
  });
  return res.json({message: info.messageId})
};
