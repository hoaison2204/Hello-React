import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
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
            this.setState({
                rangeTime: this.props.allScheduleTime
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
    render() {
        console.log('check state: ', this.state)
        let { rangeTime } = this.state;
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
                                minDate={new Date()}
                            />
                        </div>

                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button className="btn btn-schedule" key={index}>{item.valueEn}</button>
                                )
                            })}
                        </div>
                        <div className="col-12 btn-save-schedule">
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
