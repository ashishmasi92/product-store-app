import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/fetch";

function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: syncUserMutate,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ["syncUser"],
    mutationFn: syncUser,
  });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess && !isError) {
      syncUserMutate({
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.firstName || user.fullName || "",
      
        imageUrl: user.imageUrl || "",
      });
    }
  }, [isPending, isSuccess,isError, isSignedIn, user?.id, syncUserMutate]);

  return {
    isSynced: isSuccess,
  };
}
export default useUserSync;
