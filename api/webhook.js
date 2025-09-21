
// api/webhook.js
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializa Firebase Admin (usando a variável de ambiente com a chave de serviço)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email não fornecido" });
    }

    // 🔥 Salva ou atualiza o documento no Firestore
    await db.collection("usuarios").doc(email.toLowerCase()).set({
      ativo: true,
      criadoEm: new Date()
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
