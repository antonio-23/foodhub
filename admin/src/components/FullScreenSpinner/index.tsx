import { Spin } from "antd";

function FullScreenSpinner() {
  return (
    <Spin
      style={{ color: "#fb923c" }}
      tip="Ładowanie..."
      size="large"
      fullscreen={true}
    ></Spin>
  );
}

export default FullScreenSpinner;
