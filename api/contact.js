import { Resend } from 'resend';
import { supabase } from './_lib/supabase.js';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const notificationEmail = process.env.MY_EMAIL_ADDRESS || 'delivered@resend.dev'; // Default to Resend testing email if not provided

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { name, email, subject, message, _honey } = body;

        // 1. Honeypot check (anti-spam)
        if (_honey) {
            // If the honeypot field is filled out, it's likely a bot.
            // Return success to trick the bot, but don't save anything.
            return res.status(200).json({ success: true, message: 'Message sent successfully.' });
        }

        // 2. Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        
        if (message.length < 10) {
            return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address.' });
        }

        // 3. Insert into Supabase
        if (supabase) {
            const { error: dbError } = await supabase
                .from('messages')
                .insert([
                    {
                        full_name: name,
                        email: email,
                        subject: subject,
                        message: message,
                    }
                ]);

            if (dbError) {
                console.error('Supabase Insert Error:', dbError);
                return res.status(500).json({ error: 'Failed to save message to database.' });
            }
        } else {
            console.warn('Supabase is not configured. Skipping database insert.');
        }

        // 4. Send Email Notification via Resend (Optional)
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'Portfolio Contact <onboarding@resend.dev>', // You should verify a domain and change this for production
                    to: notificationEmail,
                    subject: `New Message from ${name}: ${subject}`,
                    replyTo: email,
                    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                });
            } catch (emailError) {
                console.error('Resend Email Error:', emailError);
                // We don't fail the request if the email fails, we still saved it to the DB
            }
        }

        // 5. Success Response
        return res.status(200).json({ success: true, message: 'Message sent successfully.' });

    } catch (error) {
        console.error('API Route Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
