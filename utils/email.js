import sgMail from "@sendgrid/mail";
import config from "../config/index.js";
import Logger from "./logger.js";

const logger = new Logger();

sgMail.setApiKey(config.sendgrid.sendgrid_key);

/*
--------------------------------------------
기본 이메일 보내기 
--------------------------------------------
const msg = {
  to: "algml0703@naver.com", // 메일을 받을 사람의 이메일 주소
  from: "algml9603@gmail.com", // 인증받은 나의 이메일 주소
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  })
  .catch((error) => {
    console.error("error==", error);
  });
*/

async function sendEmail(to, subject, content) {
  try {
    const from = "algml9603@gmail.com";
    for (let i = 0; i < to.length; i++) {
      const msg = {
        from,
        to: to[i],
        subject,
        text: content,
        //html,
      };
      await sgMail.send(msg).then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
        logger.log(`an email has been send: ${new Date()}`, "info");
      });
    }
  } catch (e) {
    logger.log(
      `error ,Error during processing request at : ${new Date()} details message: ${
        e.response.body.errors[0].message
      }`,
      "error"
    );
    console.log("error =======", e.response.body.errors);
  }
}

export default sendEmail;
