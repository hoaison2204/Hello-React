import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker'
class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnchangePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    render() {
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
                        <table class="table table-hover">
                            <thead>
                                <tr className="table-success">
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
