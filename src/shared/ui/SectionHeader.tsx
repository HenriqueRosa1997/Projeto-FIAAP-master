import { StyleSheet, Text, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: "#16253D",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#526075",
  },
});
