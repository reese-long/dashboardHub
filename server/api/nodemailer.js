var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'stackathonrl@gmail.com',
    pass: 'reeselong'
  }
});

const mailOptions = {
  from: 'importantAlert@gmail.com', // sender address
  to: 'reese7long@gmail.com', // list of receivers
  subject: 'IMPORTANT ALERT', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

sendAlert = (to, alertSubject, alertMessage) => {
  transporter.sendMail({
    from: 'importantAlert@gmail.com', // sender address
    to: to,
    subject: alertSubject,
    html: `<p>${alertMessage}</p>`
  }, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  })
}

module.exports = {
  sendAlert
}
