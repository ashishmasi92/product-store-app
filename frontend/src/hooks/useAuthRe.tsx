import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/api";

function useAuthReq() {
  let { isSignedIn, getToken, isLoaded } = useAuth();

  //  include the token to the request headers
  useEffect(() => {
    let interceptor = api.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        let token = await getToken();
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [isSignedIn, getToken]);
  
  return { isSignedIn, isLoaded };
}

export default useAuthReq;
// let isInteceptorRegistered = false;

// const useAuthReq = () => {
//   const { isSignedIn, getToken, isLoaded } = useAuth();

//   useEffect(() => {
//     if (isInteceptorRegistered) return;
//     isInteceptorRegistered = true;

//     const interceptor = api.interceptors.request.use(async (config) => {
//       if (isSignedIn) {
//         const token = await getToken();
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//       }
//       return config;
//     });

//     return () => {
//       api.interceptors.request.eject(interceptor);
//       isInteceptorRegistered = false;
//     };
//   }, [isSignedIn, getToken]);

//   return [isSignedIn, isLoaded];
// };
