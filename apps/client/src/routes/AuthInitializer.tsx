import { useEffect } from "react";

import { getUserProfile } from "@/app/store/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { checkSession } from "@/app/store/auth/authThunk.ts";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const { initialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      const result = await dispatch(checkSession());

      if (checkSession.fulfilled.match(result) && result.payload) {
        dispatch(getUserProfile());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!initialized) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}
