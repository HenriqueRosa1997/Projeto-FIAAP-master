import { useAuth } from "@/shared/context/AuthContext";
import { router, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

type AppHeaderProps = {
  title: string;
};

export default function AppHeader({ title }: AppHeaderProps) {
  const { user, isAdmin, logout } = useAuth();
  const segments = useSegments();
  const activeSection = segments[0] === "professor" ? segments[1] : undefined;
  const isSectionLanding =
    (activeSection === "postagens" && title === "Postagens") ||
    (activeSection === "alunos" && title === "Alunos") ||
    (activeSection === "professores" && title === "Professores");

  async function handleLogout() {
    await logout();
    router.replace("/postagemAll");
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.brand}
            onPress={() => router.replace("/postagemAll")}
            accessibilityRole="button"
            accessibilityLabel="Ir para postagens"
          >
            <View style={styles.brandMark}>
              <Ionicons name="book-outline" size={18} color="#EAF1FF" />
            </View>
            <Text style={styles.logo}>Learn.io</Text>
          </Pressable>

          {user ? (
            <View style={styles.accountActions}>
              {isAdmin ? (
                <View style={styles.roleBadge} accessibilityLabel="Administrador">
                  <Ionicons name="shield-checkmark-outline" size={16} color="#C7D8F4" />
                  <Text style={styles.roleLabel}>Admin</Text>
                </View>
              ) : null}
              <Pressable
                style={styles.logoutButton}
                onPress={handleLogout}
                accessibilityRole="button"
                accessibilityLabel="Sair da conta"
              >
                <Text style={styles.logoutLabel}>Sair</Text>
                <Ionicons name="log-out-outline" size={18} color="#DDE9FF" />
              </Pressable>
            </View>
          ) : (
            <View>
              <Pressable
                style={styles.loginButton}
                onPress={() => router.push("/login")}
                accessibilityRole="button"
                accessibilityLabel="Acessar a área do professor"
              >
                <Text style={styles.loginLabel}>Área do professor</Text>
              </Pressable>
            </View>
          )}
        </View>

        {user ? (
          <View style={styles.tabBar} accessibilityRole="tablist">
            <Pressable
              style={[styles.tab, activeSection === "postagens" && styles.tabActive]}
              onPress={() => router.replace("/professor/postagens")}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeSection === "postagens" }}
            >
              <Text style={styles.tabLabel}>Postagens</Text>
            </Pressable>
            {isAdmin ? (
              <Pressable
                style={[styles.tab, activeSection === "alunos" && styles.tabActive]}
                onPress={() => router.replace("/professor/alunos")}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeSection === "alunos" }}
              >
                <Text style={styles.tabLabel}>Alunos</Text>
              </Pressable>
            ) : null}
            {isAdmin ? (
              <Pressable
                style={[styles.tab, activeSection === "professores" && styles.tabActive]}
                onPress={() => router.replace("/professor/professores")}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeSection === "professores" }}
              >
                <Text style={styles.tabLabel}>Professores</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
        {!isSectionLanding ? (
          <View style={styles.contextBar}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#124D99",
  },
  header: {
    backgroundColor: "#124D99",
  },
  topBar: {
    minHeight: 68,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flexShrink: 1,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2168C5",
  },
  logo: {
    color: "#F6F9FF",
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  loginButton: {
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F3F7FF",
  },
  loginLabel: {
    color: "#124D99",
    fontSize: 13,
    fontWeight: "800",
  },
  accountActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  roleLabel: {
    color: "#C7D8F4",
    fontSize: 12,
    fontWeight: "700",
  },
  logoutButton: {
    minHeight: 36,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logoutLabel: {
    color: "#DDE9FF",
    fontSize: 13,
    fontWeight: "700",
  },
  contextBar: {
    minHeight: 42,
    paddingHorizontal: 20,
    backgroundColor: "#0F4388",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    color: "#F6F9FF",
    fontSize: 15,
    fontWeight: "700",
  },
  tabBar: {
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 6,
    backgroundColor: "#124D99",
  },
  tab: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "#2B6BC4",
  },
  tabLabel: {
    color: "#DDE9FF",
    fontSize: 12,
    fontWeight: "700",
  },
});
