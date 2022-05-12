import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import { CommonUtils } from "../../../utils"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import { toast } from 'react-toastify';
class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }
    handleOnchangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    // handleOnChangeImage = async (event) => {
    //     let data = event.target.files;
    //     let file = data[0];
    //     if (file) {
    //         let base64 = await CommonUtils.getBase64(file);
    //         this.setState({
    //             imgBase64: base64,
    //         })
    //     }
    // }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                size='md'
                centered
                className={'booking-modal-container'}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Confirmed check done!</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Patient's email</label>
                            <input className="form-control" type="email" value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)} disabled />
                        </div>
                        {/* <div className="col-6 form-group">
                            <label htmlFor="">Choose a file</label>
                            <input className="form-control-file" type="file"
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div> */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
