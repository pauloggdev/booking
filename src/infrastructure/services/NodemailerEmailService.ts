import { EmailService } from "../../domain/services/EmailService";
import nodemailer from "nodemailer";
export class NodemailerEmailService implements EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Configurar com o host do seu provedor SMTP
            port: 587,               // Porta do servidor SMTP (normalmente 587 para TLS)
            secure: false,           // true para 465, false para outras portas
            auth: {
                user: "mutuenegocios@gmail.com", // Seu e-mail
                pass: "bgjhobijzoeyahxb",   // Sua senha ou token do e-mail
            },
        });
    }

    async send(email: { to: string; subject: string; body: string }): Promise<void> {
        const mailOptions = {
            from: `Invoicing <${email.to}>`,
            to: email.to,                                 // Destinatário
            subject: email.subject,                       // Assunto
            html: email.body,                             // Corpo do e-mail (em HTML)
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email enviado para ${email.to}`);
        } catch (error) {
            console.error(`Erro ao enviar e-mail para ${email.to}:`, error);
            throw new Error("Falha ao enviar e-mail");
        }
    }
}
