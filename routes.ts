export const RouteNames = {
  HOME: 'home' as const,
  SHOPPING: 'shopping' as const,
  BROWSER: 'browser' as const,
  HOMETAB: 'home-tab' as const,
  LOGIN: 'login' as const,
};

// Define the types for the navigation stack
// Params are not needed for the HomeTab, so we use undefined for the value of the key
export type RootStackParamList = {
  [RouteNames.HOMETAB]: undefined; // no params needed
  [RouteNames.BROWSER]: {initialUrl?: string}; // params are optional
  [RouteNames.LOGIN]: undefined;
};
