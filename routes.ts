export const RouteNames = {
  HOME: 'Home' as const,
  SHOPPING: 'Shopping' as const,
  BROWSER: 'Browser' as const,
  HOMETAB: 'Home-tab' as const,
};

// Define the types for the navigation stack
// Params are not needed for the HomeTab, so we use undefined for the value of the key
export type RootStackParamList = {
  [RouteNames.HOMETAB]: undefined; // no params needed
  [RouteNames.BROWSER]: undefined;
};
