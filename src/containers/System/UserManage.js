import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }
  async componentDidMount() {
    let response = await getAllUsers("ALL");
    console.log(response);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }

  /** Life cycle
    Run component:
 * 1. Run construct -> init state
 * 2. Did mount (set state)
 * 3. Render *.
 */

  render() {
    console.log("check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <div className="title text-center">Manage users</div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Actions</th>
            </tr>

            {arrUsers &&
              arrUsers.map((item, index) => {
                console.log("alo check map cai: ", item, index);
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      <button className="btn-edit">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button className="btn-delete">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
