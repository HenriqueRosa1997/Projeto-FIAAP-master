import { StyleSheet, Text, TextInput, View } from "react-native";

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
};

export default function SearchField({
  value,
  onChangeText,
  placeholder,
}: SearchFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#8A8A8A"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    width: "100%",
    maxWidth: 380,
    minHeight: 42,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 16,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    color: "#222222",
    paddingVertical: 8,
    borderWidth: 0,
    outlineWidth: 0,
  },
});
