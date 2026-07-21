import React, {useEffect} from "react";
import {useSession} from "./lib/auth-client";
import {useAppDispatch} from "./redux/hooks";
import {setUserData, setIsPending} from "./redux/slices/user.slice";
import {Home} from "./pages/Home";
import {Toaster} from "react-hot-toast";

/**
 * App is the single session bridge: useSession fires one network call,
 * syncs result into Redux, and all child components read from the store.
 * Nothing else in the tree calls useSession or authClient.getSession().
 */
const App: React.FC = () => {
  const {data: session, isPending: sessionLoading} = useSession();
  const dispatch = useAppDispatch();

  // Reflect session loading state into Redux immediately
  useEffect(() => {
    if (sessionLoading) {
      dispatch(setIsPending(true));
    }
  }, [sessionLoading, dispatch]);

  // Sync resolved session → Redux (one place, no component duplication)
  useEffect(() => {
    if (!sessionLoading) {
      dispatch(setUserData(session?.user ?? null));
    }
  }, [session, sessionLoading, dispatch]);

  return (
    <>
      <Home />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
