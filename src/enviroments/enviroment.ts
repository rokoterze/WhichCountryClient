export const environment = {
  production: false,

  apiEndpoints: (() => {
    const baseUrl = "http://localhost:5000/";

    return {
      // #region Auth
      register: `${baseUrl}Auth/Register`,
      login: `${baseUrl}Auth/Login`,
      // #endregion

      // #region GeoLocation
      geoLocationSystem: `${baseUrl}Public/GetIPAddressGeoLocationSystem?ipAddress=`,
      // #endregion

      // #region User
      getUserPlans: `${baseUrl}Public/GetUserPlans`,
      deactivateUserPlan: `${baseUrl}Public/DeactivatePlan?planToken=`,
      activateUserPlan: `${baseUrl}Public/ActivatePlan?planToken=`,
      upgradeUserPLan: `${baseUrl}Public/UpgradeUserPlan`,
      getUserPlanRequestUsage: `${baseUrl}Public/GetUserPlanRequestUsage`,
      // #endregion

      // #region Lookup
      getActiveSystemPlans: `${baseUrl}Lookup/GetActiveSystemPlans`, 
      // #endregion


      // Dynamic URLs
      assignNewPlanUrl: (username: string, planId: number) =>
        `${baseUrl}Public/AssignNewPlan?username=${username}&planId=${planId}`,
    };
  })(),
};