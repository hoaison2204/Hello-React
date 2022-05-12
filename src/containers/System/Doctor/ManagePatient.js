import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {

        this.getDataPatient()

    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

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
        }, async () => {

            await this.getDataPatient()

        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (dataChildFromModal) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChildFromModal.email,
            imgBase64: dataChildFromModal.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send remedy successfully!")
            this.closeRemedyModal()
            await this.getDataPatient()
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error("Send remedy failed!")
            console.log('check res: ', res)
        }
    }
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
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
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >Confirm</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) :
                                            <tr>
                                                <td colSpan="6" className="title" style={{ color: 'red', textAlign: 'center' }}>No data!</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy} />
                </LoadingOverlay>
            </>
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
