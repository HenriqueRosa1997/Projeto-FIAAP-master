import { useAuth } from "@/shared/context/AuthContext";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

type AppHeaderProps = {
  title: string;
};

export default function AppHeader({ title }: AppHeaderProps) {
  const { user, logout } = useAuth();

  async function handleAuthAction() {
    if (user) {
      await logout();
      router.replace("/login");
      return;
    }

    router.push("/login");
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>Learn.io</Text>

          <TouchableOpacity style={styles.themeButton}>
            <Ionicons name="sunny-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.navBar}>
          <Text style={styles.navItem}>{title}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleAuthAction}
            >
              <Text style={styles.buttonText}>{user ? "Sair" : "Login"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1565C0",
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
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  themeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    minHeight: 50,
    backgroundColor: "#1976D2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navItem: {
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
