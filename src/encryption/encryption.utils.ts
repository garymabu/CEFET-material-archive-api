import { createHmac } from 'crypto';

export class EncryptionUtils {
  static hashPassword(password: string): string {
    return createHmac('sha256', password)
      .update('your-secret-key')
      .digest('hex');
  }
}
