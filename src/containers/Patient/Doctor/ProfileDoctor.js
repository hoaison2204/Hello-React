import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({ dataProfile: data });
    }
    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInfoDoctor(this.props.doctorId)
        }
    }
    renderTimeBooking = (dataTime) => {
        console.log('check dataTime: ', dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            //+ convert string to integer
            // /1000 vi timestamp tinh milisecond nen phai chia 1000 de chuyen ve thanh second
            let date = moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY');

            let time = dataTime.timeTypeData.valueEn;
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Booking for free!</div>
                </>
            )
        }
        return <></>
    }
    render() {
        let { dataProfile } = this.state;
        let { isShowDescriptionDoctor, dataTime } = this.props
        let name = '';
        if (dataProfile && dataProfile.positionData) {
            name = `${dataProfile.positionData.valueEn} - ${dataProfile.lastName} ${dataProfile.firstName}`;
        }
        console.log('check data dataTime: ', dataTime);
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className="content-right">
                        <div className="up">
                            {name}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile
                                        && dataProfile.Markdown
                                        && dataProfile.Markdown.description
                                        && <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="price">
                    Examination price: {dataProfile && dataProfile.Doctor_Info ?
                        dataProfile.Doctor_Info.priceTypeData.valueEn : ''}$
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
