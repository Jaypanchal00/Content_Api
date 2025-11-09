// import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
// import { MongoClient } from "mongodb";
// import * as brevo from "@getbrevo/brevo";
import nodemailer from "nodemailer";

// const apiInstance = new brevo.TransactionalEmailsApi();
// apiInstance.setApiKey(
//   brevo.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY!
// );

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to MongoDB
    // const client = new MongoClient(process.env.MONGODB_URI!);
    // await client.connect();

    // const db = client.db("portfolio");
    // const collection = db.collection("contacts");

    const contactData = {
      name,
      email,
      message,
      createdAt: new Date(),
    };

    // await collection.insertOne(contactData);
    // await client.close();

    // Send email notification using SMTP (nodemailer)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `Someone sent a message from your porfolio`,
      to: process.env.MY_EMAIL!,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    // Commented out brevo methods
    // const sendSmtpEmail = new brevo.SendSmtpEmail();
    // sendSmtpEmail.to = [
    //   { email: process.env.MY_EMAIL!, name: "Rahul Panchal" },
    // ];
    // sendSmtpEmail.sender = {
    //   email: "rm5901960@gmail.com",
    //   name: "Portfolio Contact",
    // };
    // sendSmtpEmail.subject = `New Contact Form Message from ${name}`;
    // sendSmtpEmail.htmlContent = `
    //   <h2>New Contact Form Submission</h2>
    //   <p><strong>Name:</strong> ${name}</p>
    //   <p><strong>Email:</strong> ${email}</p>
    //   <p><strong>Message:</strong></p>
    //   <p>${message.replace(/\n/g, "<br>")}</p>
    //   <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    // `;

    // console.log(sendSmtpEmail);

    // await apiInstance.sendTransacEmail(sendSmtpEmail);

    // Send the email using nodemailer
    await transporter.sendMail(mailOptions);
      response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
