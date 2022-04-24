import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";

import logo from "../../assets/logo/Accolade-Healthcare.svg";

class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            {/* left header */}
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo">
                <img src={logo} />
              </div>
            </div>

            {/* center header */}
            <div className="center-content">
              <div className="child-content">
                <div className="main-title">
                  <b> Chuyên khoa</b>
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

            {/* right header */}
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle "></i>Hỗ trợ
              </div>
            </div>
          </div>
        </div>

        {/* body */}
        {/* content-up */}
        {this.props.isShowBanner === true &&
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">NỀN TẢNG Y TẾ</div>
              <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
              </div>
            </div>
            {/* content-down */}
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital-alt"></i>
                  </div>
                  <div className="text-child">Khám chuyên khoa</div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">Khám từ xa</div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">Khám tổng quát</div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child">Xét nghiệm y học</div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">Sức khỏe tinh thần</div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">Khám nha khoa</div>
                </div>
              </div>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
