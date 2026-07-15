import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container :  {
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"white"
  },
  textViewStyle:{
        // flex:1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"red",
        fontStyle :"italic",
        fontSize :22
  },
  list: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
}
)

export default styles;