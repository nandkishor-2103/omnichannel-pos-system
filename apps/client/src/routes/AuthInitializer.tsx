import { useEffect } from "react";

import { getUserProfile } from "@/app/store/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const { initialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // console.log("AuthInitializer mounted");
    dispatch(getUserProfile());
  }, [dispatch]);

  if (!initialized) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}
