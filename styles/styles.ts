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
});
