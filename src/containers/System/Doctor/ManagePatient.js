import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: []
        }
    }
    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate)

    }
    getDataPatient = async (user, formattedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnchangePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formattedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formattedDate)

        })
    }
    handleBtnConfirm = () => {

    }
    render() {
        console.log('check state', this.state);
        let { dataPatient } = this.state;
        return (
            <div className="manage-patient-container">
                <div className="title">
                    Manage Patient's Schedule
                </div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label htmlFor="">Choose a date</label>
                        <DatePicker
                            onChange={this.handleOnchangePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className="col-12">
                        <table className="table table-hover">
                            <thead>
                                <tr className="table-success">
                                    <th scope="col">NO</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.timeTypeDataPatient.valueEn}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{item.patientData.genderData.valueEn}</td>
                                            <td >
                                                <button className="btn btn-success"
                                                    onClick={() => this.handleBtnConfirm()}
                                                >Confirm</button>
                                            </td>
                                        </tr>
                                    )
                                }) : <div className="title" style={{ color: 'red' }}>No data!</div>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
