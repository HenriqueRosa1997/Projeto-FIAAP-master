import { FormFieldConfig } from "@/shared/types/entities";
import ActionButton from "@/shared/ui/ActionButton";
import { ReactNode, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type EntityFormProps = {
  title: string;
  subtitle?: string;
  fields: FormFieldConfig[];
  initialValues: Record<string, string>;
  primaryActionLabel: string;
  topContent?: ReactNode;
  onPrimaryPress?: (values: Record<string, string>) => void;
  onSecondaryPress?: () => void;
  secondaryActionLabel?: string;
};

export default function EntityForm({
  title,
  subtitle,
  fields,
  initialValues,
  primaryActionLabel,
  topContent,
  onPrimaryPress,
  onSecondaryPress,
  secondaryActionLabel = "Voltar",
}: EntityFormProps) {
  const [values, setValues] = useState(initialValues);

  const orderedFields = useMemo(() => fields, [fields]);

  return (
    <View style={styles.card}>
      {topContent}

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {orderedFields.map((field) => (
        <View key={field.name} style={styles.fieldGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            value={values[field.name] ?? ""}
            placeholder={field.placeholder}
            multiline={field.multiline}
            onChangeText={(text) =>
              setValues((current) => ({ ...current, [field.name]: text }))
            }
            style={[styles.input, field.multiline && styles.multilineInput]}
          />
        </View>
      ))}

      <View style={styles.actions}>
        <ActionButton
          label={primaryActionLabel}
          onPress={() => onPrimaryPress?.(values)}
        />
        <ActionButton
          label={secondaryActionLabel}
          variant="secondary"
          onPress={onSecondaryPress}
        />
      </View>
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
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  multilineInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
});
