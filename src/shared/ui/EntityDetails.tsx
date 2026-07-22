import { DetailItem } from "@/shared/types/entities";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type EntityDetailsProps = {
  title: string;
  subtitle?: string;
  items: DetailItem[];
  topContent?: ReactNode;
  footer?: ReactNode;
};

export default function EntityDetails({
  title,
  subtitle,
  items,
  topContent,
  footer,
}: EntityDetailsProps) {
  return (
    <View style={styles.card}>
      {topContent}

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}

      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 16,
    padding: 18,
    gap: 14,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222222",
  },
  subtitle: {
    fontSize: 14,
    color: "#5E5E5E",
  },
  row: {
    gap: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E63D5",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 15,
    color: "#333333",
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 4,
  },
});
