import React, { Component } from "react";
import { connect } from "react-redux";
import { combineActions } from "../actions";

class List extends Component {
  render() {
    return (
      <div>
        {this.props.list.map((item, index) => {
          return (
            <p key={item.id}>
              <input
                style={{ width: 20, height: 20 }}
                type="checkbox"
                checked={item.checked}
                onChange={() => this.props.toggleItem(index)}
              />
              <input
                style={{ width: 200, height: 20 }}
                defaultValue={item.title}
                autoFocus={false}
                onKeyDown={(e) => {
                  e.keyCode === 13 &&
                    (() => {
                      let title = e.target.value;
                      this.props.updateItem(title, index);
                    })();
                }}
              />
              <button onClick={() => this.props.removeItem(index)}>删除</button>
            </p>
          );
        })}
      </div>
    );
  }
}
export default connect(
  ({ saga: { list } }) => ({ list }),
  (dispatch) => ({ ...combineActions(dispatch) })
)(List);
