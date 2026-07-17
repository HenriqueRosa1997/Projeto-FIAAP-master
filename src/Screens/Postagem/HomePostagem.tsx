import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockPosts = [
  {
    id: "1",
    titulo: "Titulo da Postagem",
    autor: "Fulano da Silva",
    resumo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed lectus a turpis pulvinar vulputate eu et felis. Donec varius nibh vel risus interdum mattis.",
  },
  {
    id: "2",
    titulo: "Titulo da Postagem",
    autor: "Fulano da Silva",
    resumo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed lectus a turpis pulvinar vulputate eu et felis. Donec varius nibh vel risus interdum mattis.",
  },
  {
    id: "3",
    titulo: "Titulo da Postagem",
    autor: "Fulano da Silva",
    resumo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed lectus a turpis pulvinar vulputate eu et felis. Donec varius nibh vel risus interdum mattis.",
  },
];

export default function HomePostagem() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Postagens</Text>
          <Text style={styles.subtitle}>
            Lista de postagens com dados mockados
          </Text>
        </View>

        {mockPosts.map((post) => (
          <View key={post.id} style={styles.card}>
            <View style={styles.thumbnail} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{post.titulo}</Text>
              <Text style={styles.cardAuthor}>Autor: {post.autor}</Text>
              <Text style={styles.cardDescription}>{post.resumo}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 18,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222222",
  },
  subtitle: {
    fontSize: 14,
    color: "#5E5E5E",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    padding: 16,
    gap: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 120,
    height: 120,
    backgroundColor: "#D9D9D9",
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#2A2A2A",
    marginBottom: 14,
  },
  cardAuthor: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 14,
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#383838",
  },
});
