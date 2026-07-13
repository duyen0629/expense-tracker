import { View, Pressable, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, mode, style, onPress }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  flatText: {
    color: GlobalStyles.colors.surface,
  },
  pressed: {
    opacity: 0.75,
  },
});
