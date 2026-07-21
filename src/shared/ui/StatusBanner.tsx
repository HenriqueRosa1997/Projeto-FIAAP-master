import { StyleSheet, Text, View } from "react-native";

type StatusBannerProps = {
  message: string;
  variant?: "success" | "info";
};

export default function StatusBanner({
  message,
  variant = "success",
}: StatusBannerProps) {
  return (
    <View
      style={[styles.container, variant === "info" && styles.infoContainer]}
    >
      <Text style={[styles.message, variant === "info" && styles.infoMessage]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7F8EC",
    borderWidth: 1,
    borderColor: "#8AD0A0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  infoContainer: {
    backgroundColor: "#E9EFFB",
    borderColor: "#A8C1F4",
  },
  message: {
    color: "#246B3A",
    fontSize: 14,
    fontWeight: "600",
  },
  infoMessage: {
    color: "#1E63D5",
  },
});
