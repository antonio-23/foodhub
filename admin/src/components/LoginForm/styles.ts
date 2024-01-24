import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 800px;
`;

export const Box = styled.div`
  width: 30%;
  height: 75%;
  padding: 1.2rem;
  display: flex;
  border-radius: 1.2rem;
  -webkit-box-shadow: -1px 5px 15px -3px rgba(66, 68, 90, 1);
  -moz-box-shadow: -1px 5px 15px -3px rgba(66, 68, 90, 1);
  box-shadow: -1px 5px 15px -3px rgba(66, 68, 90, 1);
  z-index: 10;
  background-color: #fff;
  flex-direction: column;
  min-width: 400px;
  min-height: 380px;
`;

export const Logo = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledImg = styled.img`
  width: 20rem;
`;

export const StyledSpan = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const Form = styled.form`
  margin-top: 3.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  gap: 3.2rem;
  position: relative;
`;

export const FormRow = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Label = styled.label`
  position: absolute;
  left: 15%;
`;

export const Input = styled.input`
  margin-top: 2.4rem;
  border-bottom: 2px solid #fb923c;
  width: 70%;
  &:focus-visible {
    outline: none;
    border: #fb923c 2px solid;
    border-radius: 0.4rem;
  }
`;

export const Error = styled.p`
  font-size: 16px;
  color: red;
  font-weight: 400;
`;

export const SubmitBtn = styled.input`
  width: 70%;
  padding: 1.2rem 3.2rem;
  position: absolute;
  bottom: 15%;
  background-color: #fb923c;
  border-radius: 10rem;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  -webkit-box-shadow: 0px 15px 29px -14px #fb923c;
  -moz-box-shadow: 0px 15px 29px -14px #fb923c;
  box-shadow: 0px 15px 29px -14px #fb923c;
  transition: ease-in-out all 0.2s;

  &:hover {
    opacity: 90%;
    transform: scale(1.01);
  }
`;
