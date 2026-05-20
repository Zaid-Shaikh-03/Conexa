import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  requiredAuth?: boolean;
}

const RouteGuard = ({ requiredAuth }: Props) => {
  const { user } = useAuth();

  if (requiredAuth && !user) return <Navigate to="/" replace />;
  if (!requiredAuth && user) return <Navigate to="/chat" replace />;

  console.log(requiredAuth);
  return <Outlet />;
};

export default RouteGuard;
