const { sendMail } = require("./email");
const cron = require("node-cron");
const TASKS = [
  {
    name: "",
    email: "",
    message: "",
  },
];

const triggerEmail = () => {
  TASKS.forEach((task) => {
    sendMail({ ...task });
  });
};

cron.schedule(process.env.CRON_SCHEDULE, () => {
  triggerEmail();
});
