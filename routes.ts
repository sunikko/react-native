export const RouteNames = {
  HOME: 'Home' as const,
  SHOPPING: 'Shopping' as const,
  BROWSER: 'Browser' as const,
  HOMETAB: 'Home-tab' as const,
};

export type RootStackParamList = {
  [RouteNames.HOMETAB]: undefined; // no params needed
  [RouteNames.BROWSER]: undefined;
};
