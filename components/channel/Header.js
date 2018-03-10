import styled from "styled-components";

export default props => (
  <Row border>
    <h3>{props.title}</h3>
    <img
      src={
        props.connected ? "/static/connected.svg" : "/static/disconnected.svg"
      }
      height={35}
      style={{ paddingRight: 10 }}
    />
  </Row>
);

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${props => (props.border ? "2px solid #222" : "none")};
`;
