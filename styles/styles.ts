import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Header 樣式
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  // Carousel 樣式
  carouselContainer: {
    marginTop: 16,
    position: 'relative',
  },
  carouselSlide: {
    width: width,
    paddingHorizontal: 16,
  },
  carouselImage: {
    width: width - 32,
    height: 250,
    borderRadius: 8,
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  carouselText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
  },
  activeDot: {
    backgroundColor: '#A0522D',
  },
  // Quick Links 樣式
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    backgroundColor: '#F4EFE6',
  },
  quickLinkButton: {
    width: '33.33%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  quickLinkBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  quickLinkBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  quickLinkIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickLinkLabel: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
  },
  // News List 樣式
  newsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  newsTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  viewMoreButton: {
    backgroundColor: '#C0C0C0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewMoreText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  newsImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  newDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  newsDate: {
    fontSize: 12,
    color: '#666666',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 12,
    color: '#666666',
  },
  // Menu 樣式
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 14,
    color: '#A0522D',
  },
  starIcon: {
    fontSize: 24,
    color: '#C0C0C0',
  },
  // Social Media 樣式
  socialContainer: {
    marginTop: 32,
    marginBottom: 32,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    letterSpacing: 2,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 24,
  },
  // MapScreen 樣式
  mapScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  shopImage: {
    width: '100%',
    height: 280,
  },
  shopInfoSection: {
    padding: 16,
  },
  shopNameJa: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  shopNameCh: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  shopDescription: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
  },
  contactCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
    position: 'relative',
  },
  contactInfo: {
    paddingRight: 60,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    width: 60,
  },
  contactText: {
    fontSize: 14,
    color: '#333333',
  },
  phoneLink: {
    color: '#A0522D',
    textDecorationLine: 'underline',
  },
  mapIconButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D2B48C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIconText: {
    fontSize: 24,
  },
  mapContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E8E8E8',
  },
  mapImage: {
    width: '100%',
    height: 400,
  },
  mapFallbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapMarkerLarge: {
    fontSize: 48,
    marginBottom: 12,
  },
  mapAddressLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  mapClickHint: {
    fontSize: 14,
    color: '#A0522D',
    marginTop: 8,
  },
  mapWebView: {
    flex: 1,
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
  mapMarkerIcon: {
    fontSize: 40,
  },
  mapInfoOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  mapInfoText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  mapInfoSubtext: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4,
  },
  mapNavigateButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D2B48C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapNavigateIcon: {
    fontSize: 24,
  },
  floatingCallButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#A0522D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  floatingCallIcon: {
    fontSize: 28,
  },
  // Drawer Menu 樣式
  drawerOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    flex: 0.2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
  },
  drawerHeader: {
    height: 150,
    position: 'relative',
    backgroundColor: '#F4EFE6',
  },
  drawerHeaderBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  drawerUserInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  drawerLoginButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  drawerLoginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  drawerRegisterButton: {
    flex: 1,
    backgroundColor: '#D2B48C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  drawerRegisterButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  drawerAvatarText: {
    fontSize: 32,
  },
  drawerUserDetails: {
    flex: 1,
  },
  drawerUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  drawerUserLink: {
    fontSize: 14,
    color: '#A0522D',
  },
  drawerMenuList: {
    paddingVertical: 8,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  drawerMenuIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
  },
  drawerMenuLabel: {
    fontSize: 16,
    color: '#333333',
  },
  drawerSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 16,
  },
  drawerSocialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerSocialIcon: {
    fontSize: 24,
  },
  drawerCloseButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  drawerCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  // CatalogScreen 樣式
  catalogContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  catalogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  catalogHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333333',
  },
  // Tab 切換樣式
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#D2B48C',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
  // 內容區樣式
  catalogContent: {
    paddingBottom: 20,
  },
  catalogBanner: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  catalogBannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // SectionList 樣式
  sectionHeader: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionHeaderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 兩欄網格卡片樣式
  kimonoRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 12,
    marginTop: 12,
  },
  kimonoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  kimonoImageContainer: {
    position: 'relative',
  },
  kimonoImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#D2B48C',
  },
  kimonoInfo: {
    padding: 12,
  },
  kimonoName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  kimonoPrice: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
  },
  // 三欄網格樣式
  threeColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    gap: 8,
  },
  threeColumnCard: {
    width: '31.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  kimonoImageSmall: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  favoriteButtonSmall: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIconSmall: {
    fontSize: 16,
    color: '#D2B48C',
  },
  kimonoInfoSmall: {
    padding: 8,
  },
  kimonoNameSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  kimononPriceSmall: {
    fontSize: 11,
    color: '#8B4513',
    fontWeight: '600',
  },
  // 收藏頁面樣式
  emptyFavorites: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyFavoritesIcon: {
    fontSize: 64,
    color: '#CCCCCC',
    marginBottom: 16,
  },
  emptyFavoritesText: {
    fontSize: 16,
    color: '#999999',
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  favoriteImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  favoriteInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  favoritePrice: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
    marginBottom: 8,
  },
  removeFavoriteButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  removeFavoriteText: {
    fontSize: 13,
    color: '#666666',
  },
  removeButton: {
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 13,
    color: '#666666',
  },
  // RecordListScreen 樣式
  recordContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  recordHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  recordList: {
    padding: 16,
  },
  recordCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  recordThumbnail: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  recordCardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  recordDate: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  recordStars: {
    flexDirection: 'row',
    gap: 2,
  },
  recordStar: {
    fontSize: 16,
    color: '#FFD700',
  },
  recordFabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D2B48C',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordFabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyRecords: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyRecordsIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyRecordsText: {
    fontSize: 16,
    color: '#999999',
  },
  // RecordFormScreen 樣式
  recordCloseButton: {
    fontSize: 24,
    color: '#333333',
    paddingHorizontal: 16,
  },
  recordFormContainer: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  requiredStar: {
    color: '#FF0000',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  formPlaceholder: {
    color: '#999999',
  },
  formTextArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingStar: {
    fontSize: 32,
    color: '#FFD700',
  },
  recordFormImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  recordSubmitButton: {
    backgroundColor: '#D2B48C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  recordSubmitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Picker Modal 樣式
  pickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  pickerModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pickerModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  pickerModalClose: {
    fontSize: 24,
    color: '#666666',
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#333333',
  },
  // RecordDetailScreen 樣式
  recordDetailContainer: {
    flex: 1,
  },
  recordDetailImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  recordDetailContent: {
    padding: 20,
  },
  recordDetailRow: {
    marginBottom: 20,
  },
  recordDetailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 8,
  },
  recordDetailValue: {
    fontSize: 16,
    color: '#333333',
  },
  recordDetailNotes: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  recordDetailStar: {
    fontSize: 24,
    color: '#FFD700',
  },
  recordDetailActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  recordEditButton: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  recordEditButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recordDeleteButton: {
    flex: 1,
    backgroundColor: '#D2B48C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  recordDeleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Loading Container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


