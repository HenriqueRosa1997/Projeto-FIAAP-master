import ActionButton from "@/shared/ui/ActionButton";
import { StyleSheet, Text, View } from "react-native";

type PaginationProps = {
  page: number;
  totalItems: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Pagination({ page, totalItems, pageSize, onPrevious, onNext }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalItems <= pageSize) return null;

  return <View style={styles.container}>
    <ActionButton label="Anterior" variant="secondary" disabled={page === 0} onPress={onPrevious} />
    <Text style={styles.label}>Página {page + 1} de {totalPages}</Text>
    <ActionButton label="Próxima" variant="secondary" disabled={page >= totalPages - 1} onPress={onNext} />
  </View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  label: { color: "#314863", fontSize: 14, fontWeight: "600" },
});
