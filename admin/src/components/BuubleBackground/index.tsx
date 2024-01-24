import {
  BackgroundWrapper,
  BubbleBig,
  BubbleBig2,
  BubbleMedium,
  BubbleMedium2,
  BubblleSmall,
  BubblleSmall2,
} from "./styles";
import "./style.css";
import React from "react";

function BubbleBackground({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BackgroundWrapper>
        {children}
        <BubbleBig />
        <BubbleBig2 />
        <BubbleMedium />
        <BubbleMedium2 />
        <BubblleSmall />
        <BubblleSmall2 />
      </BackgroundWrapper>
    </div>
  );
}

export default BubbleBackground;
