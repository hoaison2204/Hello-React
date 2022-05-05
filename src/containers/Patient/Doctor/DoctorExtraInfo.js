import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { getDoctorInfoExtraById } from '../../../services/userService'
class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailsInfo: false,
            extraInfo: {},
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getDoctorInfoExtraById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
            console.log('check get data', res);
        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailsInfo: status
        })
    }
    render() {
        let { isShowDetailsInfo, extraInfo } = this.state;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">ADDRESS OF EXAMINATION</div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}

                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailsInfo === false &&
                        <div className="short-info">
                            Examination price: {extraInfo && extraInfo.priceTypeData ? extraInfo.priceTypeData.valueEn : ''}$.
                            <span onClick={() => { this.showHideDetailInfo(true) }}>
                                See detailS
                            </span>
                        </div>
                    }
                    {isShowDetailsInfo === true &&
                        <>
                            <div className="detail-info">
                                <div className="price">
                                    <div className="left">Detail information</div>
                                    <div className="right">
                                        Examination price: {extraInfo && extraInfo.priceTypeData ? extraInfo.priceTypeData.valueEn : ''}$.
                                    </div>
                                </div>
                                <div className="note">
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>

                            <div className="payment">
                                Payments: {extraInfo && extraInfo.paymentTypeData ? extraInfo.paymentTypeData.valueEn : ''}

                            </div>

                            <div className="hide-price">
                                <span onClick={() => { this.showHideDetailInfo(false) }}>
                                    Hide details
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
