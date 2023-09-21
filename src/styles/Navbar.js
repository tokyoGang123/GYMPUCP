import styled from "styled-components";

export const StyledLogo = styled.img`
  width: 100px;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  height: auto;
`;

export const StyledNavLink = styled.div`
  padding: 0 5px 0 5px;
  text-decoration: none;
  :hover {
    color: #f7c325 !important;
    font-weight: 600;
  }
`;

export const StyledProfile = styled.div`
  display: flex;
  justify-content: flex-end;
`;
