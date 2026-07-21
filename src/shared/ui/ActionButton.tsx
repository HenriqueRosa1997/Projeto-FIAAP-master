import { Pressable, StyleSheet, Text } from "react-native";

type ActionButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger";
};

export default function ActionButton({
  label,
  onPress,
  variant = "primary",
}: ActionButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        variant === "danger" && styles.dangerButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          variant === "secondary" && styles.secondaryLabel,
          variant === "danger" && styles.dangerLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#1E63D5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: "#E9EFFB",
  },
  dangerButton: {
    backgroundColor: "#FDECEC",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryLabel: {
    color: "#1E63D5",
  },
  dangerLabel: {
    color: "#C63D3D",
  },
});
