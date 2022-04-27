import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: []
        }
    }
    async componentDidMount() {
        // console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'));
        // console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));
        this.setArrDays();
    }

    setArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        })
    }

    handleOnchangeSelect = async (event) => {

        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            console.log('check doctor Id: ', doctorId);
            console.log('check date: ', date);
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log('check res schedule from react: ', res)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { allDays } = this.state;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option
                                    value={item.value}
                                    key={index}
                                >{item.label}</option>
                            )
                        })}
                    </select>

                </div>
                <div className="all-available-schedule-time">

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
