import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fas fa-bars"></i>
            <div className="header-logo"></div>
          </div>

          <div className="center-content">
            <div className="child-content">
              <div className="main-title">
                <b>Chuyên khoa</b>
              </div>
              <div className="sub-title">Tìm bác sĩ</div>
            </div>
            <div className="child-content">
              <div className="main-title">
                <b>Cơ sở y tế</b>
              </div>
              <div className="sub-title">Tìm bệnh viện</div>
            </div>
            <div className="child-content">
              <div className="main-title">
                <b>Bác sĩ</b>
              </div>
              <div className="sub-title">Bác sĩ giỏi</div>
            </div>
            <div className="child-content">
              <div className="main-title">
                <b>Gói khám</b>
              </div>
              <div className="sub-title">Khám tổng quát</div>
            </div>
          </div>

          <div className="right-content">
            <div className="support">
              <i className="fas fa-question-circle custom-color"></i>Hỗ trợ
            </div>
            <div className="flag">VN</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
