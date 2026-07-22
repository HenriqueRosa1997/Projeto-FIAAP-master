import { useAuth } from "@/shared/context/AuthContext";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
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
      <View style={styles.formCard}>
        <Text style={styles.title}>Acessar Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#8A8A8A"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.passwordField}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Senha"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#8A8A8A"
          />
          <Pressable
            style={styles.eyeButton}
            onPress={() => setMostrarSenha((current) => !current)}
            accessibilityRole="button"
            accessibilityLabel={
              mostrarSenha ? "Ocultar senha" : "Visualizar senha"
            }
          >
            <SymbolView
              name={
                mostrarSenha
                  ? {
                      ios: "eye.slash",
                      android: "visibility_off",
                      web: "visibility_off",
                    }
                  : {
                      ios: "eye",
                      android: "visibility",
                      web: "visibility",
                    }
              }
              size={20}
              tintColor="#6B7280"
              fallback={
                <Text style={styles.eyeFallback}>
                  {mostrarSenha ? "Ocultar" : "Ver"}
                </Text>
              }
            />
          </Pressable>
        </View>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={entrar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonLabel}>Entrar</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  formCard: {
    width: "100%",
    maxWidth: 360,
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 46,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  passwordField: {
    width: "100%",
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: 6,
    top: 4,
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeFallback: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
  },
  error: {
    color: "#C62828",
    width: "100%",
    textAlign: "left",
  },
  button: {
    width: "100%",
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: "#1E63D5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
