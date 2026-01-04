import NetInfo from "@react-native-community/netinfo";

export async function checkInternet(): Promise<boolean> {
  const state = await NetInfo.fetch();
  return !!state.isConnected && state.isInternetReachable !== false;
}
