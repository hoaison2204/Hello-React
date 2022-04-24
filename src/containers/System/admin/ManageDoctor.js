import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss";
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
        };
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check state', this.state)
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };
    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
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
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    {/* content right */}
                    <div className="content-right">
                        <label>Introductory information</label>
                        <textarea className="form-control" rows='4'
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}>
                            A b c d e f u and your mom and your sister and your job
                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>

                <div className="col-12 my-3">
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className="btn btn-primary">
                        Save</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
