import actionTypes from "./actionTypes";
import { toast } from "react-toastify"
import {
  editUserService,
  getAllCodeService,
  createNewUserService,
  getAllUsers, deleteUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService
} from "../../services/userService";

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      })
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed())
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log('fetchGenderStart error: ', e);
    }
  }
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed())
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log('fetchPositionStart error: ', e);
    }
  }
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed())
      }
    } catch (e) {
      dispatch(fetchRoleSuccess());
      console.log('fetchRoleSuccess error: ', e);
    }
  }
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//create new user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log('check create user redux: ', res)
      if (res && res.errCode === 0) {
        toast.success("Create successfully!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log('saveUserFailed error: ', e);
    }
  }
}
export const saveUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS'
})
export const saveUserFailed = () => ({
  type: 'CREATE_USER_FAILED'
})

//delete user
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log('check create user redux: ', res)
      if (res && res.errCode === 0) {
        toast.success("Delete successfully!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log('deleteUserFailed error: ', e);
    }
  }
}
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED
})

//edit user
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log('check create user redux: ', res)
      if (res && res.errCode === 0) {
        toast.success("Update successfully!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update failed!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      dispatch(editUserFailed());
      console.log('editUserFailed error: ', e);
    }
  }
}
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED
})

//all users
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all user error!");
        dispatch(fetchAllUsersFailed())
      }
    } catch (e) {
      toast.error("Fetch all user error!");
      dispatch(fetchAllUsersFailed());
      console.log('fetchAllUsersFailed error: ', e);
    }
  }
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data
})
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
})

//fetch top doctors
export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService('');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED
        })
      }
    } catch (e) {
      console.log('FETCH_TOP_DOCTORS_FAILED: ', e)
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED
      })
    }
  }
}

//fetch all doctors
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED
        })
      }
    } catch (e) {
      console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED
      })
    }
  }
}

//save detail doctor
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save information detail doctor successfully!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        })
      } else {
        toast.error("Save information detail doctor failed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
        })
      }
    } catch (e) {
      toast.error("Save information detail doctor failed!");
      console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e)
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
      })
    }
  }
}

export const fetchAllScheduleTime = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('TIME');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
        })
      }
    } catch (e) {
      console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
      })
    }
  }
}