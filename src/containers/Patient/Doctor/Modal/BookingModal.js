import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from "reactstrap";
import ProfileDoctor from '../ProfileDoctor';
import _ from "lodash";
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from "moment";
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reasons: '',
            birthday: '',
            genders: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });

    }

    handleConfirmBooking = async () => {
        //validate input
        // !data.email || !data.doctorId || !data.timeType || !data.date
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reasons: this.state.reasons,
            date: date,
            genders: this.state.genders,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully!')
            this.props.closeBookingModal();
        } else {
            toast.error('Booking a new appointment failed!')
        }
        console.log('confirm button:, ', this.state)
    }

    buildTimeBooking = (dataTime) => {
        console.log('check dataTime: ', dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            //+ convert string to integer
            // /1000 vi timestamp tinh milisecond nen phai chia 1000 de chuyen ve thanh second
            let date = moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY');

            let time = dataTime.timeTypeData.valueEn;
            return `${time} - ${date}`
        }
        return ''
    }


    buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
            return name;
        }
        return ''
    }
    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }

        return (

            <Modal
                isOpen={isOpenModal}
                size='lg'
                centered
                className={'booking-modal-container'}
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Booking information</span>
                        <span className="right"
                            onClick={closeBookingModal}
                        ><i className="fas fa-times"></i></span>
                    </div>

                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 from-group">
                                <label htmlFor="">Full name</label>
                                <input className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Phone number</label>
                                <input className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Email</label>
                                <input className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Contact address</label>
                                <input className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>

                            <div className="col-12 from-group">
                                <label htmlFor="">Explanation</label>
                                <input className="form-control"
                                    value={this.state.reasons}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reasons')}
                                />
                            </div>
                            <div className="col-6 from-group">
                                <label htmlFor="">Birthday</label>
                                <DatePicker
                                    onChange={this.handleOnchangePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                // minDate={yesterday}
                                />
                            </div>

                            {/* <div className="col-6 from-group">
                                <label htmlFor="">Book for:</label>
                                <input className="form-control" />
                            </div> */}

                            <div className="col-6 from-group">
                                <label htmlFor="">Gender</label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn btn-primary"
                            onClick={() => this.handleConfirmBooking()}>
                            Confirm</button>
                        <button className="btn btn-secondary"
                            onClick={closeBookingModal}>
                            Cancel</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
