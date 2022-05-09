import React, { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from '../homePage/HomeHeader'
class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
        if (this.props.match && this.props.match.params) {

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { statusVerify, errCode } = this.state;
        console.log('check state: ', this.state);
        return (
            <>
                <HomeHeader />
                <div style={{ marginTop: '25%' }}>
                    {statusVerify === false ?
                        <div className='title'>Loading data...</div>
                        :
                        <div className='title'>
                            {+errCode === 0 ?
                                <div style={{ color: 'green' }}>Appointment confirmation successful!</div> : <div style={{ color: 'red' }}>Appointment does not exist or has been confirmed!</div>
                            }
                        </div>
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
