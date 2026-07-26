import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function readArgument(name) {
  const position = process.argv.indexOf(`--${name}`);
  return position >= 0 ? process.argv[position + 1]?.trim() : undefined;
}

const email = readArgument("email")?.toLowerCase();
const password = readArgument("password");
const nome = readArgument("nome") ?? "Administrador";
const especialidade = readArgument("especialidade") ?? "Administração";
const serviceAccount = readArgument("service-account");

if (!email || !password) {
  throw new Error("Uso: npm run seed:admin -- --email admin@exemplo.com --password senha-segura [--nome Nome] [--especialidade Área]");
}

const credential = serviceAccount
  ? cert(JSON.parse(await (await import("node:fs/promises")).readFile(serviceAccount, "utf8")))
  : applicationDefault();

if (!getApps().length) {
  initializeApp({ credential });
}

const auth = getAuth();
const db = getFirestore();

let user;
try {
  user = await auth.getUserByEmail(email);
} catch (error) {
  if (error.code !== "auth/user-not-found") throw error;
  user = await auth.createUser({ email, password, displayName: nome });
}

await auth.setCustomUserClaims(user.uid, {
  ...user.customClaims,
  role: "admin",
});

await db.collection("professores").doc(user.uid).set({
  nome,
  email,
  especialidade,
  updatedAt: Date.now(),
  createdAt: Date.now(),
}, { merge: true });

console.log(`Administrador configurado: ${email}`);
console.log("Peça ao usuário para sair e entrar novamente para atualizar o token de acesso.");
