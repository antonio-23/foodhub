import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Image = styled.svg`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Text = styled.h1`
  font-size: 32px;
  color: var(--color-grey-200);
`;

function PageNotFound() {
  return (
    <Container>
      <Image
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='16' x2='12' y2='12' />
        <line x1='12' y1='8' x2='12' y2='8' />
      </Image>
      <Text>404 - Page Not Found</Text>
    </Container>
  );
}

export default PageNotFound;
