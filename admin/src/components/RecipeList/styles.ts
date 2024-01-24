import styled from "styled-components";

export const Recipes = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1.2rem;
  overflow: hidden;
`;

export const RecipeItem = styled.div`
  height: 12rem;
  width: 20rem;
  border: 2px solid #fb923c;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Image = styled.img`
  width: 10rem;
  height: 12rem;
`;

export const Box = styled.div`
  display: flex;
`;

export const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
