import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";

const Container = styled.div`
  height: 7vh;
  display: flex;
  justify-content: space-around;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-left: 1px solid;
`;

export default function Nav() {
  const history = useHistory();
  return (
    <>
      <Container>
        <Logo>
          <Link to="/">NomadCoffee(Home)</Link>
        </Logo>
        <Menu>
          <Link to="/add">Add</Link>
        </Menu>
        <Menu>Search around</Menu>
        <Menu>Message</Menu>
        <Menu>Support</Menu>
        <Menu>
          <button
            onClick={() => {
              logUserOut();
              history.push("/");
            }}
          >
            Logout
          </button>
        </Menu>
      </Container>
    </>
  );
}
