import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  overflow: hidden !important;
  height: 100vh;
  z-index: -5;
`;

export const BubbleBig = styled.div`
  background-color: #fb923c;
  height: 55rem;
  width: 55rem;
  border-radius: 50rem;
  position: absolute;
  right: 0;
  top: 10%;
  opacity: 70%;
  transform: translate(50%, -50%);
  z-index: -5;
  @media (max-width: 1024px) {
    height: 45rem;
    width: 45rem;
    transform: translate(50%, -50%);
  }
  @media (max-width: 1560px) {
    transform: translate(40%, -50%);
  }
`;

export const BubbleBig2 = styled.div`
  background-color: #fb923c;
  height: 55rem;
  width: 55rem;
  border-radius: 50rem;
  position: absolute;
  left: -8%;
  bottom: -15%;
  opacity: 70%;
  z-index: -5;
  @media (max-width: 1024px) {
    height: 45rem;
    width: 45rem;
    transform: translate(-20%);
  }
  @media (max-width: 1560px) {
    transform: translate(10%, 20%);
  }
`;

export const BubbleMedium = styled.div`
  position: absolute;
  z-index: -5;
  background-color: #fb923c;
  height: 55rem;
  width: 55rem;
  border-radius: 50rem;
  left: 12%;
  bottom: -25%;
  @media (max-width: 1024px) {
    height: 45rem;
    width: 45rem;
    transform: translate(0, 30%);
  }
  @media (max-width: 1560px) {
    transform: translate(-10%, 40%);
  }
`;

export const BubbleMedium2 = styled.div`
  position: absolute;
  z-index: -5;
  background-color: #fb923c;
  height: 55rem;
  width: 55rem;
  border-radius: 50rem;
  right: 6%;
  top: -25%;
  @media (max-width: 1024px) {
    height: 45rem;
    width: 45rem;
    transform: translate(0, -20%);
  }
  @media (max-width: 1560px) {
    transform: translate(-10%, -30%);
  }
`;

export const BubblleSmall = styled.div`
  position: absolute;
  background-color: #fb923c;
  height: 40rem;
  width: 40rem;
  border-radius: 50rem;
  opacity: 50%;
  right: 8%;
  top: 12%;
  z-index: -5;
  transform: translate(25%, 0);
  @media (max-width: 1024px) {
    height: 30rem;
    width: 30rem;
    transform: translate(20%, 0);
  }
  @media (max-width: 1560px) {
    transform: translate(0%, -20%);
  }
`;

export const BubblleSmall2 = styled.div`
  position: absolute;
  background-color: #fb923c;
  height: 40rem;
  width: 40rem;
  border-radius: 50rem;
  opacity: 50%;
  left: 12%;
  bottom: 15%;
  z-index: -5;

  @media (max-width: 1024px) {
    height: 30rem;
    width: 30rem;
  }
  @media (max-width: 1560px) {
    transform: translate(10%, 40%);
  }
`;
