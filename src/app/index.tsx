import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>Learn.io</Text>

          <TouchableOpacity style={styles.themeButton}>
            <Ionicons name="sunny-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.navBar}>
          <Text style={styles.navItem}>Página Inicial</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Learn.io</Text>
        <Text style={styles.subtitle}>
          Aqui ficará o conteúdo da página inicial.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    backgroundColor: "#1565C0",
  },

  topBar: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  themeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  navBar: {
    height: 50,
    backgroundColor: "#1976D2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  navItem: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  buttons: {
    flexDirection: "row",
  },

  button: {
    backgroundColor: "#2E7DFF",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
