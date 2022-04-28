import actionTypes from '../actions/actionTypes';

const initialState = {
    // isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfo: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // fetch gender
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state }
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            return {
                ...state
            }

        // fetch position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }

        // fetch role
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }

        // fetch top doctors
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state
            }

        // fetch all doctors
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state
            }

        //fetch schedule time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }

        //fetch required doctor info
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state
            }

        // default
        default:
            return state;
    }
}

export default adminReducer;