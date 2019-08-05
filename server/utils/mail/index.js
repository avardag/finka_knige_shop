const nodemailer = require("nodemailer");
const welcomeTemplate = require("./welcomeTemplate");

const getEmailData = (to, name, token, templateType)=>{
  let data  = null;

  switch (templateType) {
    case "welcome":
      data = {
        from: 'Finka <finkaknives@gmail.com>',
        to: to,
        subject: `Welcome ${name} to Finka Knives Shop`,
        // text: 'Testing mails',
        html: welcomeTemplate()
      };
      break;
  
    default:
      return data;
  }
  return data;
}

const sendEmail = (to, name, token, templateType) =>{
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_MAIL,
      pass: process.env.GMAIL_PASS
    }
  });
  let mail = getEmailData(to, name, token, templateType);

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err)
    }
    console.log(info.envelope);
    console.log(info.messageId);
    transporter.close();
  });
}

module.exports = sendEmail;