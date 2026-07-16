import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Posts() {
  const router = useRouter();

  return (
    <View>
      <Text>Minhas Publicações</Text>

      <Button
        title="Criar Publicação"
        onPress={() => router.push("/professor/criar-post")}
      />
    </View>
  );
}
