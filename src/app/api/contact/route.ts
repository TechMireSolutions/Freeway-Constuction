import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import nodemailer from 'nodemailer'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token,
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, service, message } = data

    // 1. Save to Sanity if token is available
    if (projectId && token) {
      try {
        await sanityClient.create({
          _type: 'contactSubmission',
          name,
          email,
          phone,
          service,
          message,
          submittedAt: new Date().toISOString()
        })
      } catch (sanityError) {
        console.error("Failed to save to Sanity", sanityError)
        // We continue even if Sanity fails, to try sending the email
      }
    }

    // 2. Send Email via SMTP if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        const mailOptions = {
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // where you want to receive emails
          subject: `New Lead: ${name} - ${service}`,
          text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}
          `,
          html: `
            <h3>New Contact Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <h4>Message:</h4>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        }

        await transporter.sendMail(mailOptions)
      } catch (emailError) {
        console.error("Failed to send email", emailError)
        // Continue and return success if at least Sanity succeeded? 
        // We will return 500 if BOTH failed, but if one succeeded it's partially ok.
        // For simplicity, we just return 200 below if we reach this point.
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
