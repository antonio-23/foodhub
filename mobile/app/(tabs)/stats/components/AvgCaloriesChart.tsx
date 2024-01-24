import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface AvgCaloriesChartProps {
  chartData: {
    totalAvgKcal: number;
    avgProteins: number;
    avgFats: number;
    avgCarbs: number;
    chartTitle: string;
  };
}

const AvgCaloriesChart = ({ chartData }: AvgCaloriesChartProps) => {
  const { totalAvgKcal, avgProteins, avgFats, avgCarbs, chartTitle } =
    chartData;

  const renderLegend = (text: string, color: string) => {
    return (
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || "white",
          }}
        />
        <Text style={{ color: "white", fontSize: 16 }}>{text || ""}</Text>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          marginVertical: 1,
          marginHorizontal: 0,
          borderRadius: 10,
          paddingVertical: 50,
          backgroundColor: "#414141",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {chartTitle ?? "Średni Rozkład Makro"}
        </Text>

        <PieChart
          strokeColor="white"
          strokeWidth={4}
          donut
          data={[
            {
              value: avgProteins,
              color: "rgb(84,219,234)",
              text: `${avgProteins}%`,
              textColor: "#414141",
              shiftTextX: -6,
              shiftTextY: 2,
            },
            {
              value: avgCarbs,
              color: "lightgreen",
              text: `${avgCarbs}%`,
              textColor: "#414141",
              shiftTextX: -6,
              shiftTextY: 2,
            },
            {
              value: avgFats,
              color: "orange",
              text: `${avgFats}%`,
              textColor: "#414141",
              shiftTextX: -6,
              shiftTextY: 2,
            },
          ]}
          innerCircleColor="#414141"
          innerCircleBorderWidth={4}
          innerCircleBorderColor={"white"}
          showValuesAsLabels={true}
          showText
          textSize={18}
          textBackgroundRadius={22}
          showTextBackground={true}
          centerLabelComponent={() => {
            return (
              <View>
                <Text
                  style={{ color: "white", fontSize: 34, textAlign: "center" }}
                >
                  {totalAvgKcal}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 18, textAlign: "center" }}
                >
                  Kcal
                </Text>
              </View>
            );
          }}
        />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend("Białko", "rgb(84,219,234)")}
          {renderLegend("Węglowodany", "lightgreen")}
          {renderLegend("Tłuszcze", "orange")}
        </View>
      </View>
    </View>
  );
};

export default AvgCaloriesChart;
