'use strict';

const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.from = `${process.env.EMAIL_HOST_NAME} <${process.env.EMAIL_HOST_USER}>`;
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
  }

  createTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      debug: true,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(template, subject) {
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //     firstName: this.firstName,
    //     url: this.url,
    //     subject
    // });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      // html,
      text: `Hello ${this.firstName},\n\nWelcome to the Natours Family!\n\n${this.url}`,
    };

    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }
};
