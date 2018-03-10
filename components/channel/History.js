import styled from "styled-components"
// import { format } from "date-fns"

export default class extends React.Component {
  componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementById("messageList")
    objDiv.scrollTop = objDiv.scrollHeight
  }
  render() {
    return (
      <History id="messageList">
        {this.props.messages.map((item, i) => Sorter(item))}
      </History>
    )
  }
}

const Sorter = item => {
  switch (item.type) {
    case "system":
      return <System key={item.time}>{item.msg}</System>
      break
    case "me":
      return (
        <MyMessage key={item.time}>
          {/* <Time>{format(item.time, "mm:ss")}</Time> */}
          {item.msg}
        </MyMessage>
      )
      break
    case "partner":
      return <Partner key={item.time}>{item.msg}</Partner>
      break

    default:
      break
  }
}

const Time = styled.span`
  font-size: 10px;
  opacity: 0.6;
  margin: 0 1rem;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${props => (props.border ? "2px solid #222" : "none")};
`

const History = styled.div`
  border-top: 2px solid #222;
  margin: 0 0 5px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  flex: 1;
`
const System = styled.p`
  height: 20px;
  font-size: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(56, 26, 54, 0.2);
`

const MyMessage = styled.p`
  text-align: right;
  padding: 0rem 1rem 0.3rem;
  border-bottom: 1px solid rgba(56, 26, 54, 0.2);
  color: rgba(0, 0, 0, 0.6);
`

const Partner = styled.p`
  padding: 0rem 1rem 0.3rem;
  border-bottom: 1px solid rgba(56, 26, 54, 0.2);
`
