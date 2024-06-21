import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  ENV_KEY,
  EnvironmentService,
} from 'src/environment/environment.service';

@Injectable()
export class EmailService {
  private transporter;
  constructor(private readonly environmentService: EnvironmentService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: environmentService.get(ENV_KEY.SMTP_SERVER_USERNAME), // replace with your email
        pass: environmentService.get(ENV_KEY.SMTP_SERVER_PASSWORD), // replace with your password
      },
    });
  }
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: this.environmentService.get(ENV_KEY.SMTP_SERVER_EMAIL), // replace with your email
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
