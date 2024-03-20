import { Heading } from "../components/Heading";
import { Row } from "../components/Row";
import DashboardLayout from "../features/Dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Strona główna</Heading>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
