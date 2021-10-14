import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 24px;
  color: orange;
  margin-bottom: 5%;
`;
