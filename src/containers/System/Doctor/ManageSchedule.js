import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { dateFormat } from '../../../utils'
import { saveBulkScheduleDoctor } from '../../../services/userService'

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect,
                selectedDoctor: {}
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            console.log('check range time: ', this.props.allScheduleTime)
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            console.log('check data:', data)
            this.setState({
                rangeTime: data
            })

        }
    }
    
    buildDataInputSelect = (inputData) => {
        let result = [];
        // let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.label = labelVi;
                object.value = item.id;
                result.push(object);
            })
            return result;
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };

    handleOnchangePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime,
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Please select a date!");
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Please select a doctor!")
        }
        let formattedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    console.log('check schedule: ', schedule, index, selectedDoctor)
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })

            }
            else {
                toast.error("Please select a time!");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate,
        });

        if (res && res.errCode === 0) {
            toast.success('Save successfully!');

        } else {
            toast.error('Error save schedule!');
            console.log('save bulk schedule: ', res);
        }
    }
    render() {
        let { rangeTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('check state: ', rangeTime);

        return (
            <div className="manage-schedule-container">
                <div className="title">Manage Schedule</div>

                <div className="container main-content">
                    <div className="row">
                        <div className="col-6">
                            <label>Choose a doctor</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>

                        <div className="col-6">
                            <label>Pick a date</label>
                            <DatePicker
                                onChange={this.handleOnchangePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>

                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                        key={index}
                                        onClick={() => this.handleClickButtonTime(item)}
                                    >{item.valueEn}</button>
                                )
                            })}
                        </div>
                        <div className="col-12 btn-save-schedule"
                            onClick={() => this.handleSaveSchedule()}>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
