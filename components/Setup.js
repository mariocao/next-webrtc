import styled from "styled-components";

export default class extends React.Component {
  state = {
    form: 1
  };

  startChannel = (address, transactions, deposit) => {
    this.setState({ form: 0 });
    setTimeout(() => {
      this.props.setChannel();
    }, 500);
  };

  render() {
    var { form } = this.state;
    return (
      <AnimatedLeftBox active={form === 1}>
        <h2>Enter a WebRTC Channel</h2>
        <p>{`Lorem ipsum blah blah`}</p>
        <p>{`You can also chat with your partner in the sidebar.`}</p>
        <Button active={true} onClick={() => this.startChannel()}>
          {`Enter the Channel`}
        </Button>
      </AnimatedLeftBox>
    );
  }
}

const AnimatedLeftBox = styled.span`
  position: absolute;
  padding: 10px;
  transition: all 0.5s ease;
  transform: ${props =>
    props.active ? "translateY(0px)" : "translateY(20px)"};
  visibility: ${props => (props.active ? "visible" : "hidden")};
  opacity: ${props => (props.active ? "1" : "0")};
`;
const Button = styled.button`
  padding: 15px 20px;
  background: ${props =>
    !props.active ? "grey" : "linear-gradient(135deg, #ef7564, #f06263)"};
  border: none;
  color: white;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;
