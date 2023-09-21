import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import serverConfig from '../config/server.config';
import { MailOptionsAttributeI } from '../interfaces/mail.interface';
import fs from 'fs';
import Handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';

class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo> =
    createTransport({
      host: serverConfig.EMAIL_HOST,
      port: serverConfig.EMAIL_PORT,
      requireTLS: true,
      auth: {
        user: serverConfig.EMAIL_USER,
        pass: serverConfig.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });

  public async sendMail(options: MailOptionsAttributeI) {
    const { to, from, subject, templateName, replacements } = options;
    const filePath = `./src/resources/templates/${templateName}.html`;
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = Handlebars.compile(source);
    const html = template(replacements);
    const mailData: Mail.Options = {
      from: `${from ? from : serverConfig.EMAIL_SENDER} <${
        serverConfig.EMAIL_USER
      }>`,
      to: to,
      subject: subject,
      html: html,
    };

    this.transporter.sendMail(
      mailData,
      (error: Error, info: SMTPTransport.SentMessageInfo) => {
        if (error) {
          serverConfig.DEBUG(`Error in sending mail: ${error}`);
        }
        serverConfig.DEBUG(`Email ${info.messageId} sent: ${info.response}`);
        return info;
      },
    );
  }
}

export default new MailService();
