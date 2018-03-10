import { Link, Router } from "../routes";
import styled from "styled-components";

import { isClient, seedGen } from "../libs/utils";
import { Layout, SingleBox } from "../components/Layout";
import Header from "../components/channel/Header";
import History from "../components/channel/History";

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return query;
  }

  state = {
    visible: 0,
    title: `Waiting for peer to connect...`,
    history: [
      { msg: "Waiting for a partner...", type: "system", time: Date.now() }
    ],
    connected: false,
    channel: "share",
    alert: false,
    alertText: "Test"
  };

  componentDidMount() {
    console.log("Channel ID: " + this.props.id);
    setTimeout(() => {
      this.setState({ visible: 1 });
    }, 300);
  }

  updateHistory = data => {
    var history = this.state.history;
    history.push(data);
    this.setState({ history });
  };

  sendMessage = e => {
    e.preventDefault();
    if (!this.state.message) return;
    this.updateHistory({
      msg: this.state.message,
      type: "me",
      time: Date.now()
    });
    //RTC.broadcastMessage({ cmd: "message", msg: this.state.message })
    console.log("Sending message", this.state.message);
    this.setState({ message: "" });
  };

  render() {
    return (
      <Layout>
        <Alert alert={this.state.alert}>
          <AlertBox>
            <h2 style={{ zIndex: 300 }}>
              {this.state.alertText && this.state.alertText}
            </h2>
            <Button
              onClick={() => this.setState({ alert: false })}
            >{`   Clear Notification  `}</Button>
          </AlertBox>
        </Alert>
        <SingleBox active={this.state.visible === 1} row wide>
          <Left>
            {this.state.channel === "share" && (
              <div>
                <Header
                  title={this.state.title}
                  connected={this.state.connected}
                />
                <p>Share this room link with your partner:</p>
                <p>{isClient ? window.location.href : null}</p>
              </div>
            )}
          </Left>
          <Right>
            <h3>Channel History</h3>
            <History messages={this.state.history} />
            <Form onSubmit={e => this.sendMessage(e)}>
              <Input
                type={"text"}
                placeholder={"Send a message"}
                value={this.state.message}
                onChange={msg => this.setState({ message: msg.target.value })}
              />
              <Send type={`submit`}>Send</Send>
            </Form>
          </Right>
        </SingleBox>
      </Layout>
    );
  }
}

const AlertBox = styled.div`
  background: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #222;
  padding: 1rem 4rem;
  text-align: center;
  // &::before {
  //   content: "";
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  //   height: 100%;
  //   width: 25%;
  //   background: rgba(232, 206, 230, 1);
  // }
`;

const Alert = styled.div`
  z-index: 200;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.alert ? "1" : "0")};
  visibility: ${props => (props.alert ? "visible" : "hidden")};
  transition: all 0.4s ease;
`;
const Button = styled.button`
  flex: ${props => (props.full ? "1" : null)};
  padding: 15px 20px;
  background: ${props =>
    props.accent ? "linear-gradient(135deg, #ef7564, #f06263)" : "#222"};
  border: none;
  color: white;
  font-weight: 600;
  margin: ${props => (props.full ? "1rem 0rem" : "0 1rem")};
  margin: ${props => (props.left ? "1rem 0rem 1rem 3rem" : null)};
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 16px;
  border-bottom: 2px solid rgba(56, 26, 54, 0.2);
  &:focus {
    outline: none;
  }
`;

const Left = styled.div`
  position: relative;
  flex: 1.7 0;
  flex-direction: column;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    width: 100%;
    min-height: 20rem;
  }
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  background: rgba(232, 206, 230, 1);
  padding: 10px 20px 20px;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    width: 100%;
    min-height: 20rem;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${props => (props.border ? "2px solid #222" : "none")};
`;

const Send = styled.button`
  background: rgba(56, 26, 54, 0.6);
  border: none;
  color: white;
  padding: 5px 10px;
  margin-left: 10px;
`;
