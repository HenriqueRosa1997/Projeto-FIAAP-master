import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type EntityCardProps = {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  leading?: ReactNode;
  actions?: ReactNode;
  onTitlePress?: () => void;
};

export default function EntityCard({
  title,
  subtitle,
  description,
  badge,
  leading,
  actions,
  onTitlePress,
}: EntityCardProps) {
  return (
    <View style={styles.card}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}

      <View style={styles.content}>
        <View style={styles.titleRow}>
          {onTitlePress ? (
            <Pressable onPress={onTitlePress}>
              <Text style={[styles.title, styles.titleLink]}>{title}</Text>
            </Pressable>
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
          {badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
        {actions ? <View style={styles.actions}>{actions}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  leading: {
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 10,
    justifyContent: "flex-start",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "500",
    color: "#2A2A2A",
  },
  titleLink: {
    color: "#1E63D5",
  },
  subtitle: {
    fontSize: 16,
    color: "#333333",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#383838",
  },
  badge: {
    backgroundColor: "#E9EFFB",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#1E63D5",
    fontSize: 12,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 4,
  },
});
