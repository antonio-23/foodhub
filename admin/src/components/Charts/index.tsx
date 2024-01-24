import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, ChartBox, Description, StyledSpan } from "./styles";
import { useQuery } from "react-query";
import { fetchAllUsers } from "../../services/usersAPI";
import Spinner from "../Spinner";
import { calcGender } from "../../utils/calcGender";
import { calcNewUsers } from "../../utils/calcNewUsers";
import { calcPercentage } from "../../utils/calcPercentage";
function Charts() {
  const { isLoading, data: users } = useQuery({
    queryFn: fetchAllUsers,
    queryKey: ["allUsers"],
  });
  if (isLoading) return <Spinner />;
  const stats = calcGender(users);
  const registers = calcNewUsers(users);
  const percentage = calcPercentage(stats[0].value, stats[1].value);
  return (
    <>
      <ChartBox>
        <Box>
          <StyledSpan>{`Liczba nowych użytkowników (ostatnie 7 dni):`}</StyledSpan>
          <Box>
            <LineChart
              width={650}
              height={200}
              data={registers}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Rejestracji" stroke="#82ca9d" />
            </LineChart>
          </Box>
        </Box>
        <Box>
          <StyledSpan>{`Podział użytkowników (wg płci):`}</StyledSpan>
          <PieChart width={200} height={200}>
            <Pie
              data={stats}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#fb923c"
            >
              <LabelList stroke="#000" dataKey="name" position="bottom" />
            </Pie>
          </PieChart>
          <Description>
            {`Mężczyźni stanowią ${percentage.percentage1.toFixed(2)}% (${
              stats[0].value
            }), a kobiety ${percentage.percentage2.toFixed(2)}% (${
              stats[1].value
            })`}
          </Description>
        </Box>
      </ChartBox>
    </>
  );
}

export default Charts;
