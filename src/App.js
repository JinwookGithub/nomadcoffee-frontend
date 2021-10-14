import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import NotFound from "./screens/NotFound";
import Add from "./screens/Add";
import Nav from "./components/Nav";
import Shop from "./components/Shop";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
`;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          {isLoggedIn ? (
            <Router>
              <Nav />
              <Container>
                <Switch>
                  <Route path={routes.home} exact>
                    <Home />
                  </Route>
                  <Route path={routes.add} exact>
                    <Add />
                  </Route>
                  <Route path={routes.shop} exact>
                    <Shop />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </Container>
            </Router>
          ) : (
            <Router>
              <Switch>
                <Route path={routes.signUp} exact>
                  <SignUp />
                </Route>
                <Route path={routes.home} exact>
                  <Login />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Router>
          )}
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
