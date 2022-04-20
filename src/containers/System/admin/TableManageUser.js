import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from '../../../store/actions'

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers
      })
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id)
  }

  render() {
    console.log('check all users: ', this.props.listUsers)
    console.log('check state: ', this.state.usersRedux)
    let arrUsers = this.state.usersRedux;
    return (
      <table id="TableManageUser">
        <tbody>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>


          {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  <button className="btn-edit"><i className="fas fa-edit"></i></button>
                  <button
                    onClick={() => this.handleDeleteUser(item)}
                    className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                </td>
              </tr>

            )
          })}


        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return {
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
