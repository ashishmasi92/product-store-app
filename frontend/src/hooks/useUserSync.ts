import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/fetch";

// 👉 When a user logs in with Clerk, send their info to your backend database.
// 👉 If the user already exists in your database, update their info.
// 👉 If the user doesn't exist in your database, create a new user.

function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: mutateSyncUser,  
    isSuccess,
  } = useMutation({
    mutationKey: ["syncUser"],
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    mutateSyncUser({
      email: user.primaryEmailAddress?.emailAddress!,
      fullname: user.fullName ?? user.firstName!,
      imageUrl: user.imageUrl,
    });
  }, [isSignedIn, user?.id]);

  return {
    isSynced: isSuccess,
  };
}
export default useUserSync;

// function useUserSync() {
//   const { isSignedIn } = useAuth();
//   const { user } = useUser();

//   const {
//     mutate: mutateSyncUser,
//     isPending,
//     isSuccess,
//     isError,
//   } = useMutation({
//     mutationKey: ["syncUser"],
//     mutationFn: syncUser,
//   });

//   useEffect(() => {
//     if (isSignedIn && user && !isPending && !isSuccess && !isError) {
//       mutateSyncUser({
//         email: user.primaryEmailAddress?.emailAddress || "",
//         name: user.firstName || user.fullName || "",

//         imageUrl: user.imageUrl || "",
//       });
//     }
//   }, [isPending, isSuccess,isError, isSignedIn, user?.id, mutateSyncUser]);

//   return {
//     isSynced: isSuccess,
//   };
// }
// export default useUserSync;
