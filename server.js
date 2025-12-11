// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// ROTA PARA ENVIAR O EMAIL
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // CONFIGURAÇÃO DO SMTP DO YAHOO
    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: process.env.YAHOO_USER,
        pass: process.env.YAHOO_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.YAHOO_USER,
      to: "danielvcsoares@yahoo.com.br",
      subject: `Nova mensagem do site - ${name}`,
      text: `
Nome: ${name}
Email: ${email}

Mensagem:
${message}
      `,
    });

    res.status(200).json({ success: true, message: "E-mail enviado com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar:", err);
    res.status(500).json({ error: "Erro ao enviar e-mail." });
  }
});

// Porta automática do Render
app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando...");
});