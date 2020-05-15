import React, { Component } from "react";
import { connect } from "react-redux";
import { appendItem } from "../actions";

class Input extends Component {
  state = { value: "" };
  render() {
    return (
      <div>
        <input
          style={{ borderWidth: 1, borderColor: "red" }}
          placeholder="请输入代办事项"
          value={this.state.value}
          onChange={(event) =>
            this.setState({
              value: event.target.value,
            })
          }
          onKeyDown={(event) => {
            event.keyCode === 13 &&
              (() => {
                let title = event.target.value;
                title.length > 0 &&
                  (() => {
                    this.props.appendItem(title);
                    this.setState({
                      value: "",
                    });
                  })();
              })();
          }}
        />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    appendItem: (value) => dispatch(appendItem(value)),
  })
)(Input);
