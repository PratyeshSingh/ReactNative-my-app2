import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  linkText: {
    fontSize: 18,
    color: '#007aff',
    marginTop: 12,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  pageContent: {
    flex: 1,
    padding: 16,
  },
  searchRow: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  categoryScrollView: {
    flexGrow: 0, // Extracted from inline style
  },
  categoryScrollContent: {
    paddingLeft: 0,
    paddingRight: 8,
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'nowrap',
  },
  categoryBadge: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#e8e8f2',
    marginRight: 8,
    marginBottom: 0,
    alignSelf: 'center',
    flexShrink: 0,
  },
  categoryBadgeActive: {
    backgroundColor: '#007aff',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
    flexShrink: 0,
  },
  categoryTextActive: {
    color: '#fff',
    fontSize: 14,
  },
  productList: {
    flex: 1, // Extracted from inline style
  },
  productListContent: {
    paddingBottom: 32, // Extracted from inline style
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066cc',
  },
  detailContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  detailImage: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  detailDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginTop: 12,
    marginBottom: 12,
  },
  detailRating: {
    fontSize: 14,
    color: '#555',
  },
  productCategory: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  loadingText: {
    marginTop: 12,
    color: '#555',
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 20,
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
});

export default styles;