import { Link, Router } from "../routes";
import styled from "styled-components";

import { isClient, seedGen } from "../libs/utils";
import { Layout, SingleBox } from "../components/Layout";
import Setup from "../components/Setup";

export default class extends React.Component {
  state = {
    visible: 0
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: 1 });
    }, 300);
  }

  setChannel = (address, transactions, deposit) => {
    this.setState({ visible: 0 });
    const channelID = seedGen(10);
    console.log("Starting channel with ID: ", channelID);
    setTimeout(() => {
      Router.pushRoute(`/channel/${channelID}`);
    }, 500);
  };

  render() {
    var { visible } = this.state;
    return (
      <Layout>
        {/* {console.log(this.state.form)} */}
        <SingleBox noBg active={visible === 1}>
          {/* <Logo src={"/static/logo.svg"} /> */}
          <Setup setChannel={this.setChannel} {...this.state} />
        </SingleBox>
      </Layout>
    );
  }
}

const Logo = styled.img`
  height: 40px;
`;
