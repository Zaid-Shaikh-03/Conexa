import { useEffect } from "react";
import { useAuth } from "./hooks/use-auth";
import AppRoutes from "./routes";
import { Spinner } from "./components/ui/spinner";
import Logo from "./components/logo";
import { useLocation } from "react-router-dom";
import { inAuthRoute } from "./routes/routes";
import { useSocket } from "./hooks/use-socket";

function App() {
  const { pathname } = useLocation();
  const { user, isAuthStatus, isAuthStatusLoading } = useAuth();
  const { onlineUsers } = useSocket();
  console.log(onlineUsers, "onlineUsers");

  const isAuth = inAuthRoute(pathname);
  useEffect(() => {
    isAuthStatus();
  }, [isAuthStatus]);

  if (isAuthStatusLoading && !user && !isAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo imgClass="size-20" show-text={false} />
        <Spinner className="w-6 h-6" />
      </div>
    );
  }
  return <AppRoutes />;
}

export default App;
