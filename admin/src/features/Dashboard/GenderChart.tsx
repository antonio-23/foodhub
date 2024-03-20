import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Heading } from "../../components/Heading";
import { ChartBox } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { gender } from "../../services/apiAuth";

export default function GenderChart() {
  const { data } = useQuery(["gender"], gender);

  return (
    <ChartBox>
      <Heading as='h2'>Podział na płeć</Heading>
      <ResponsiveContainer width='100%' height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey='gender'
            dataKey='value'
            innerRadius={85}
            outerRadius={110}
            paddingAngle={3}
          >
            {data?.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.name} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign='middle'
            align='right'
            layout='vertical'
            iconSize={15}
            iconType='circle'
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
