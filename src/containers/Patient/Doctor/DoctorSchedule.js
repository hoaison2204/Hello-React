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
            allDays: [],
            allAvailableTimes: [],
        }
    }
    async componentDidMount() {
        let allDays = this.getArrDays();
        this.setState({
            allDays: allDays,
        })

        console.log('check all day: ', allDays);
    }

    getArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM')
                let today = `Today - ${ddMM}`;
                object.label = today;
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }



            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    handleOnchangeSelect = async (event) => {

        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            console.log('check doctor Id: ', doctorId);
            console.log('check date: ', date);
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : []
                })
            }
            else {

            }
            console.log('check res schedule from react: ', res)
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays();
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTimes: res.data ? res.data : []
            })
        }
    }
    render() {
        let { allDays, allAvailableTimes } = this.state;
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
                    <div className="text-calendar">
                        <i className="fas fa-calendar-alt"><span>Examination schedule</span></i>
                    </div>
                    <div className="time-content">
                        {allAvailableTimes
                            && allAvailableTimes.length > 0
                            ?
                            <>
                                <div className="time-content-btn">
                                    {allAvailableTimes.map((item, index) => {
                                        let timeDisplay = item.timeTypeData.valueEn
                                        return (
                                            <button key={index}>{timeDisplay}</button>
                                        )
                                    })
                                    }
                                </div>
                                <div className="book-free">
                                    <span>Choose and book now! <i className="fas fa-hand-point-up"></i></span>
                                </div>
                            </>
                            : <div>
                                No appointments during this time!
                            </div>
                        }
                    </div>
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
