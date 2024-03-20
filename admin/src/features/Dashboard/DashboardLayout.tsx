import GenderChart from "./GenderChart";
import Stats from "./Stats";
import { StyledDashboardLayout } from "./styles";

export default function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <Stats />
      <GenderChart />
    </StyledDashboardLayout>
  );
}
