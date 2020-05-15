import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "../util";
import { combineState, combineDispatch } from "../userReducer";
class User extends Component {
  handleChange(text) {
    return (event) => {
      const val = event.target.value;
      text === "username"
        ? this.props.changeName(val)
        : this.props.changeAddress(val);
    };
  }
  componentDidMount() {
    this.props.loadAsyncData([
      {
        key: 0,
        text: "异步数据",
      },
    ]);
  }
  render() {
    return (
      <div className="App">
        用户名:
        <input
          onChange={this.handleChange.bind(this)("username")}
          value={this.props.username}
          type="text"
        ></input>
        地址:
        <input
          onChange={this.handleChange.bind(this)("address")}
          value={this.props.address}
          type="text"
        ></input>
        <hr />
        <button onClick={() => this.props.search()}>搜索</button>&nbsp;&nbsp;
        <button onClick={() => this.props.reset()}>重置</button>&nbsp;&nbsp;
        <button
          onClick={() =>
            this.props.addItem({
              key: uuid(),
              text: `中央人民广播电台${uuid()}`,
            })
          }
        >
          新增
        </button>
        &nbsp;&nbsp;
        <button
          onClick={() =>
            this.props.modifyItem(1, {
              key: 1,
              text: "修改了这条数据",
            })
          }
        >
          手动修改第二条数据
        </button>
        <br />
        {this.props.userList.map((item, key) => (
          <div key={item.key}>
            <p onClick={() => this.props.delItem(key)}>{item.text}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ...combineState(state),
  }),
  (dispatch) => ({ ...combineDispatch(dispatch) })
)(User);
