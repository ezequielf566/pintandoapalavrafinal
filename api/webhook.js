import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializa Firebase Admin
initializeApp({ credential: applicationDefault() });
const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Método não permitido");
  try {
    const { email } = req.body;
    if(!email) return res.status(400).send("Email ausente");
    await db.collection("usuarios").doc(email.toLowerCase()).set({ ativo:true, criadoEm:new Date() });
    res.status(200).send("Usuário cadastrado com sucesso");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno");
  }
}