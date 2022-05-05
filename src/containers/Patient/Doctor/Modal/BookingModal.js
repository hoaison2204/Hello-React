import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from "reactstrap";
import ProfileDoctor from '../ProfileDoctor';
import _ from "lodash";

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        console.log('data time: ', dataTime);
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
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 from-group">
                                <label htmlFor="">Full name</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Phone number</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Email</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Contact address</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-12 from-group">
                                <label htmlFor="">Explanation</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Book for:</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-6 from-group">
                                <label htmlFor="">Gender</label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn btn-primary"
                            onClick={closeBookingModal}>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
