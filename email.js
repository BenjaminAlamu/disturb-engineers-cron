const mailgun = require("mailgun-js");
require("dotenv").config();

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const from_who = process.env.EMAIL_FROM;

const mail_gun = new mailgun({ apiKey: api_key, domain: domain });
let Mailgen = require("mailgen");
const generator = new Mailgen({
  theme: "default",
  product: {
    name: "Disturb The Engineers",
    link: "https://benjaminalamu.dev/",
  },
});

module.exports = {
  sendMail: async function (user) {
    const body = {
      body: {
        greeting: `Hi ${user.name}`,
        signature: `Best Regards`,
        intro: user.message,
        action: {
          instructions: `Please note that I would only disable when I see a PR sha`,
          button: {
            color: "#2C316C",
            text: "Mark as Completed",
            link: process.env.COMPLETION_LINK,
          },
        },
        outro: `See you at the next alert boss`,
      },
    };

    const data = {
      from: from_who,
      to: user.email,
      subject: "Remainder",
      text: generator.generatePlaintext(body),
      html: generator.generate(body),
    };

    mail_gun.messages().send(data);
  },
};
