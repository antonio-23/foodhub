import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function Spinner() {
  return (
    <Spin
      style={{ color: "#fb923c" }}
      indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />}
    />
  );
}

export default Spinner;
