import { useAuth } from "@/shared/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function entrar() {
    setLoading(true);
    setErrorMessage("");

    try {
      await login(email.trim(), senha);
      router.replace("/professor");
    } catch {
      setErrorMessage("Não foi possível entrar. Verifique seu email e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {loading ? (
        <ActivityIndicator size="small" color="#1565C0" />
      ) : (
        <Button title="Entrar" onPress={entrar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  error: {
    color: "#C62828",
    marginBottom: 12,
  },
});
