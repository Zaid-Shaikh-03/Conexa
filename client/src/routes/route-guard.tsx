import { Outlet } from "react-router-dom";

interface Props {
  requiredAuth?: boolean;
}

const RouteGuard = ({requiredAuth}: Props) => {
  console.log(requiredAuth);

  return <Outlet />;
};

export default RouteGuard;
