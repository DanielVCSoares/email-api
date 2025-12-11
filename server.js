import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa o Resend com a chave do Render
const resend = new Resend(process.env.RESEND_API_KEY);

// ROTA PARA ENVIAR O EMAIL
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["danielvcsoares@yahoo.com.br"],
      subject: `Nova mensagem do site - ${name}`,
      html: `
        <h2>Nova mensagem recebida</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Email enviado:", response);
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