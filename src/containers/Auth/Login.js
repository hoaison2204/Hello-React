import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    //khai báo các state
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangeUserPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.userData);
        console.log("login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleOnKeyDown = (event) => {
    console.log('check keydown: ', event);
    if (event.key === "Enter" || event.keycode === 13) {
      this.handleLogin()
    }
  }

  render() {
    //jsx
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>UserName</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                onChange={(event) => this.handleOnChangeUserName(event)}
                required
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(event) => this.handleOnChangeUserPassword(event)}
                  onKeyDown={(event) => this.handleOnKeyDown(event)}
                  required
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye-slash"
                        : "far fa-eye"
                    }></i>
                </span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
