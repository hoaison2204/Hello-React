import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss";
import Select from 'react-select';
import { languages } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService'
import { CRUD_ACTIONS } from "../../../utils"

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfo()
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === "USERS") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    object.label = labelVi;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueEn} USD`;
                    object.label = labelVi;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type = "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueEn}`;
                    object.label = labelVi;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

            return result;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            console.log("data new: ", dataSelectPrice, dataSelectPayment, dataSelectProvince);
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            doctorId: this.state.selectedOption.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince } = this.state;
        let res = await getDetailInfoDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '',
                nameClinic = '',
                note = '',
                paymentId = '',
                priceId = '',
                provinceId = '',
                selectedPayment = '',
                selectedPrice = '',
                selectedProvince = '';

            if (res.data.Doctor_Info) {
                addressClinic = res.data.Doctor_Info.addressClinic;
                nameClinic = res.data.Doctor_Info.nameClinic;
                note = res.data.Doctor_Info.note;
                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId;
                provinceId = res.data.Doctor_Info.provinceId;

                selectedPayment = listPayment.find(item => {
                    if (item.value === paymentId) {
                        return item && item.value === paymentId;

                    }
                })
                selectedPrice = listPrice.find(item => {
                    if (item.value === priceId) {
                        return item && item.value === priceId;

                    }
                })
                selectedProvince = listProvince.find(item => {
                    if (item.value === provinceId) {
                        return item && item.value === provinceId;

                    }
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
            })
        }
        console.log('check res: ', res)
    };
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        console.log("check new select on change: ", selectedOption, stateName);
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="title manage-doctor-title">
                    Create doctor's information
                </div>

                <div className="more-info">
                    {/* content left */}
                    <div className="content-left form-group">
                        <label htmlFor="">Choose the doctor</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={"Choose a doctor"}
                            name="selectedOption"
                        />
                    </div>
                    {/* content right */}
                    <div className="content-right">
                        <label>Introductory information</label>
                        <textarea className="form-control" rows='4'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                            name="description"
                        >
                        </textarea>
                    </div>


                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label>Choose price
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={"Choose a price"}
                                name="selectedPrice"
                            />
                        </label>
                    </div>

                    <div className="col-4 form-group">
                        <label>Choose payment method
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={"Choose payment method"}
                                name="selectedPayment"
                            />
                        </label>
                    </div>
                    <div className="col-4 form-group">
                        <label>Choose city
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={"Choose city"}
                                name="selectedProvince"
                            />
                        </label>
                    </div>

                    <div className="col-4 form-group">
                        <label>Clinic name
                            <input className="form-control"
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            ></input>
                        </label>
                    </div>

                    <div className="col-4 form-group">
                        <label>Clinic address
                            <input className="form-control"
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}>
                            </input>
                        </label>
                    </div>

                    <div className="col-4 form-group">
                        <label>Note
                            <input className="form-control"
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}>
                            </input>
                        </label>
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>

                <div className="col-12 my-3">
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className={hasOldData === true ? "btn btn-warning" : "btn btn-primary"}>
                        {hasOldData === true ? <span>Save</span> : <span>Save change</span>}</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
