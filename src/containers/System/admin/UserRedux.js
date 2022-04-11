import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleId: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data,
                })
            }
            let resPosition = await getAllCodeService('position')
            if (resPosition && resPosition.errCode === 0) {
                this.setState({
                    positionArr: resPosition.data,
                })
            }
            let resRole = await getAllCodeService('role')
            if (resRole && resRole.errCode === 0) {
                this.setState({
                    roleId: resRole.data
                })
            }

        } catch (e) {
            console.log(e);
        }
    }


    render() {
        console.log('check state: ', this.state)
        let genders = this.state.genderArr;
        let roleIds = this.state.roleId;
        let position = this.state.positionArr;

        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux
                </div>

                <div className="user-redux-body">
                    <div lassName="container">
                        <div className="row">
                            <div className="col-12">Add new user</div>
                            <div className="col-3">
                                <label>First name</label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="col-3">
                                <label>Last name</label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="col-3">
                                <label>Email</label>
                                <input className="form-control" type="email" />
                            </div>

                            <div className="col-3">
                                <label>Password</label>
                                <input className="form-control" type="Password" />
                            </div>

                            <div className="col-3">
                                <label>Phone number</label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="col-9">
                                <label>Address</label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="col-3">
                                <label>Gender</label>
                                <select className="form-control">
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>{item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>Role ID</label>
                                <select className="form-control">
                                    {roleIds && roleIds.length > 0 && roleIds.map((item, index) => {
                                        return (
                                            <option key={index}>{item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>Position</label>
                                <select className="form-control">
                                    {position && position.length > 0 && position.map((item, index) => {
                                        return (
                                            <option value={index}>{item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label>Image</label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
