export const environment = {
    production: false,

    //#region  PublicAPI
    register: "http://localhost:5000/Auth/Register",
    login: 'http://localhost:5000/Auth/Login',

    getIPGeoLocation: 'http://localhost:5000/PublicAPI/CheckIpAddressGeoLocation?ipAddress=',
    getCountryFlag: 'http://localhost:5000/PublicAPI/GetCountryFlagBase64?countryCode=',
    //#endregion

    //#region WCApi direct access
    test_getIPGeoLocation: 'http://localhost:5001/GeoLocation/IPAddressGeoLocation?ipAddress=',
    test_getCountryFlag: 'http://localhost:5001/GeoLocation/GetCountryFlag?countryCode=',
    //#endregion
  };

  