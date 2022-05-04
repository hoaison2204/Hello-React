import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { getScheduleDoctorByDate } from '../../../services/userService'
class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailsInfo: false,
        }
    }
    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailsInfo: status
        })
    }
    render() {
        let { isShowDetailsInfo } = this.state;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">address</div>
                    <div className="name-clinic">phong kham chuyen khoan</div>
                    <div className="detail-address">207 pho hue</div>
                </div>
                <div className="content-down">
                    {isShowDetailsInfo === false &&
                        <div className="short-info">
                            gia kham: 250k .
                            <span onClick={() => { this.showHideDetailInfo(true) }}>
                                see detail
                            </span>
                        </div>
                    }

                    {isShowDetailsInfo === true &&
                        <>
                            <div className="title-price">gia kham</div>

                            <div className="detail-info">
                                <div className="price">
                                    <div className="left">gia kham</div>
                                    <div className="right">250k</div>
                                </div>
                                <div className="note">
                                    duoc uu tien kham truoc khi dat qua HealthCare
                                </div>
                            </div>

                            <div className="payment">nguoi benh co the thanh toan chi phi bang hinh thuc tien mat hoac quen the
                            </div>

                            <div className="hide-price">
                                <span onClick={() => { this.showHideDetailInfo(false) }}>
                                    Hide
                                </span>
                            </div>
                        </>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
