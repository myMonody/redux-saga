import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    let count = 0;
    this.props.list.map((item) => (count = !item.finished ? count + 1 : count));
    return (
      <div>
        <h1>任务清单</h1>
        <h3>
          {count
            ? `你有${count}个待办事项，赶快去处理`
            : `没有待办事项，快去添加吧`}
        </h3>
      </div>
    );
  }
}
export default connect(({saga:{list}}) => ({list}))(Header);
