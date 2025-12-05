// src/routes/api/contact/+server.ts
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';

// Variables d'environnement
const SMTP_USER = process.env.SMTP_USER; // ton@email.com
const SMTP_PASS = process.env.SMTP_PASS; // ton mot de passe d'application Gmail

interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data: ContactData = await request.json();
        
        // Validation basique
        if (!data.name || !data.email || !data.subject || !data.message) {
            return new Response(
                JSON.stringify({ error: 'Tous les champs sont requis' }), 
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        // Configuration du transporteur email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            }
        });
        
        // Envoi de l'email de TOI à TOI
        await transporter.sendMail({
            from: SMTP_USER, // Ton adresse Gmail
            to: SMTP_USER,   // Ton adresse Gmail (même adresse)
            subject: `🗿 Nouveau message gaulois: ${data.subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4e4c1; border: 3px solid #b89968; border-radius: 10px;">
                    <h2 style="color: #4a3621; text-align: center;">📜 Nouveau message du village gaulois</h2>
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong style="color: #4a3621;">🗡️ Nom du guerrier:</strong> ${data.name}</p>
                        <p><strong style="color: #4a3621;">📧 Email du guerrier:</strong> ${data.email}</p>
                        <p><strong style="color: #4a3621;">🎯 Mission:</strong> ${data.subject}</p>
                        <hr style="border: 1px solid #b89968; margin: 15px 0;">
                        <p><strong style="color: #4a3621;">✍️ Message:</strong></p>
                        <div style="background: #faf8f3; padding: 15px; border-left: 4px solid #b89968; border-radius: 4px;">
                            ${data.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    <p style="text-align: center; color: #6b5444; font-size: 12px; font-style: italic;">
                        "Par Toutatis! Ce message a été envoyé depuis le formulaire gaulois"
                    </p>
                </div>
            `,
            // Version texte brut pour les clients email sans HTML
            text: `
Nouveau message du village gaulois

Nom: ${data.name}
Email: ${data.email}
Mission: ${data.subject}

Message:
${data.message}
            `
        });
        
        return new Response(
            JSON.stringify({ success: true, message: 'Message envoyé avec succès!' }), 
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return new Response(
            JSON.stringify({ 
                error: 'Erreur serveur lors de l\'envoi', 
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            }), 
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};