import Link from "next/link";
import styled from "styled-components";

import { Layout, SingleBox } from "../components/Layout";
import Setup from "../components/Channel";

export default class extends React.Component {
  state = {
    form: 1
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ form: 1 })
    }, 300)
  }

  render() {
    var { form } = this.state;
    return (
      <Layout>
        {/* {console.log(this.state.form)} */}
        <SingleBox noBg active={form === 1}>
          {/* <Logo src={"/static/logo.svg"} /> */}
          <Setup setChannel={this.startChannel} {...this.state} />
        </SingleBox>
      </Layout>
    );
  }
}

const Logo = styled.img`
  height: 40px;
`;
