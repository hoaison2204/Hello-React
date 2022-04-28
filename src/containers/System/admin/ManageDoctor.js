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
            selectProvince: '',
            nameClinical: '',
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
        // let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                // let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueEn;
                object.label = labelVi;
                object.value = item.id;
                result.push(object);
            })
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
            let dataSelectPrice = this.buildDataInputSelect(resPayment)
            let dataSelectPayment = this.buildDataInputSelect(resPrice)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInfoDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        console.log('check res: ', res)
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
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
                        />
                    </div>
                    {/* content right */}
                    <div className="content-right">
                        <label>Introductory information</label>
                        <textarea className="form-control" rows='4'
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>


                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label>Choose price
                            <Select
                                // value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listPrice}
                                placeholder={"Choose price"}
                            />
                        </label>
                    </div>

                    <div className="col-4 form-group">
                        <label>Choose payment method
                            <Select
                                // value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listPayment}
                                placeholder={"Choose payment method"}
                            />
                        </label>
                    </div>
                    <div className="col-4 form-group">
                        <label>Choose city
                            <Select
                                // value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listProvince}
                                placeholder={"Choose city"}
                            />
                        </label>
                    </div>

                    <div className="col-4 form-group"><label>Clinic name<input className="form-control"></input></label></div>
                    <div className="col-4 form-group"><label>Clinic address<input className="form-control"></input></label></div>
                    <div className="col-4 form-group"><label>Note<input className="form-control"></input></label></div>
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
