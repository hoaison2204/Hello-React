import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRedux.scss';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //gender
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        //position
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        //role
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    openImagePreview = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roleIds = this.state.roleArr;
        let position = this.state.positionArr;

        // let isGetGenders = this.props.isLoadingGender
        console.log('check state form redux: ', this.state)

        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux
                </div>
                <div className="user-redux-body">
                    <div lassName="container">
                        <div className="row">
                            <div className="col-12 my-3">Add new user</div>
                            {/* <div className="col-12">{isGetGenders === true ? 'loading genders' : 'abc'}</div> */}
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
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                    <label className="label-upload" htmlFor="previewImg">Upload <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openImagePreview()}>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>

                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
