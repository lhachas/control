import { MailerOptions, HandlebarsAdapter } from '@nest-modules/mailer';
import { join } from 'path';

export const MailConfig: MailerOptions = {
    transport: {
        secureConnection: true,
        host: 'smtp.gmail.com',
        port: '587',
        service: 'Gmail',
        requireTLS: true,
        auth: {
            user: 'lionelsh.salazar@gmail.com',
            pass: '12091098lionel',
        },
        tls: {
            ciphers: 'SSLv3',
        },
    },
    template: {
        dir: join(process.cwd(), 'src/@template/mail'),
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
};
