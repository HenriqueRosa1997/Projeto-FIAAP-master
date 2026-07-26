const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { HttpsError, onCall } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");

initializeApp();

const adminEmail = defineString("ADMIN_EMAIL");

function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function assertValidProfessor(data) {
  const nome = typeof data.nome === "string" ? data.nome.trim() : "";
  const email = normalizeEmail(data.email);
  const especialidade = typeof data.especialidade === "string" ? data.especialidade.trim() : "";
  const senha = typeof data.senha === "string" ? data.senha : "";

  if (!nome || !email || !especialidade || senha.length < 6) {
    throw new HttpsError(
      "invalid-argument",
      "Informe nome, e-mail, especialidade e uma senha de pelo menos seis caracteres.",
    );
  }

  return { nome, email, especialidade, senha };
}

exports.createProfessorAccount = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "É necessário estar autenticado.");
  }

  const callerEmail = normalizeEmail(request.auth.token.email);
  const configuredAdminEmail = normalizeEmail(adminEmail.value());
  const isAdmin = callerEmail === configuredAdminEmail || request.auth.token.role === "admin";

  if (!isAdmin) {
    throw new HttpsError("permission-denied", "Apenas administradores podem cadastrar professores.");
  }

  const professor = assertValidProfessor(request.data);
  let user;

  try {
    user = await getAuth().createUser({
      email: professor.email,
      password: professor.senha,
      displayName: professor.nome,
    });

    await getAuth().setCustomUserClaims(user.uid, { role: "teacher" });

    await getFirestore().collection("professores").doc(user.uid).set({
      nome: professor.nome,
      email: professor.email,
      especialidade: professor.especialidade,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  } catch (error) {
    if (user) {
      await getAuth().deleteUser(user.uid);
    }

    if (error && typeof error === "object" && "code" in error && error.code === "auth/email-already-exists") {
      throw new HttpsError("already-exists", "Já existe uma conta com este e-mail.");
    }

    throw new HttpsError("internal", "Não foi possível cadastrar o professor.");
  }

  return { uid: user.uid };
});
