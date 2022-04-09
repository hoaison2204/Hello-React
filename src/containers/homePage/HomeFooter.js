import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2022 Nguyễn Hoài Sơn</p>
                <div className="font-icon">
                    <a href="https://www.facebook.com/Hoaison2204" target="_blank"><i className="fab fa-facebook"></i></a>
                    <a style={{ color: "black" }} href="https://github.com/hoaison2204" target="_blank"><i className="fab fa-github"></i></a>
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
