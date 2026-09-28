import { StyleSheet } from 'react-native';

const ARCADE_RED = '#E53935';
const ARCADE_BLUE = '#1E88E5';
const ARCADE_GREEN = '#43A047';
const ARCADE_GOLD = '#FBC02D';
const DARK_BG = '#121212';
const TEXT_WHITE = '#FFFFFF';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 4,
    borderBottomColor: ARCADE_BLUE,
    paddingBottom: 10,
  },
  gameTitle: {
    color: ARCADE_GOLD,
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  logoutText: {
    color: ARCADE_RED,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  selectText: {
    color: TEXT_WHITE,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    backgroundColor: ARCADE_BLUE,
    padding: 5,
    borderWidth: 2,
    borderColor: TEXT_WHITE,
    fontFamily: 'monospace',
  },
  showcaseArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  characterCenter: {
    flex: 1,
    alignItems: 'center',
  },
  characterName: {
    color: TEXT_WHITE,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: ARCADE_RED,
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1,
    fontFamily: 'monospace',
    marginTop: 10,
  },
  characterDesc: {
    color: ARCADE_GREEN,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginTop: 10,
  },
  arrow: {
    color: ARCADE_GOLD,
    fontSize: 40,
    fontWeight: 'bold',
  },
  arrowDisabled: {
    color: '#333333',
  },
  actionButtons: {
    paddingBottom: 20,
  },
  primaryBtn: {
    backgroundColor: ARCADE_RED,
    padding: 15,
    borderWidth: 3,
    borderColor: TEXT_WHITE,
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    padding: 15,
    borderWidth: 3,
    borderColor: ARCADE_GOLD,
    alignItems: 'center',
  },
  btnText: {
    color: TEXT_WHITE,
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  loadingText: {
    color: ARCADE_GOLD,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 100,
    fontFamily: 'monospace',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  scrollCenter: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  titleGigante: {
    color: ARCADE_RED,
    fontSize: 45,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: ARCADE_BLUE,
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  formContainer: {
    marginVertical: 20,
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderWidth: 3,
    borderColor: ARCADE_BLUE,
  },
  label: {
    color: ARCADE_GREEN,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    fontFamily: 'monospace',
  },
  input: {
    backgroundColor: TEXT_WHITE,
    borderWidth: 2,
    borderColor: ARCADE_BLUE,
    color: DARK_BG,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  actionButtonsForm: {
    marginTop: 10,
  },
});