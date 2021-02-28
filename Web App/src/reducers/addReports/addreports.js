/**
 * Created by S jawwad hashmi on 3/3/2017.
 */

import AuthActions from "./../../stores/action/auth";



const InitalState = {
    isError: { status: false, msg: '' },
    isProcessing: false,
    crimes: {},
    complaints: {},
    missings: {},
    reports: {},
    userReports: {},
    users: {}
};

export const ReportsReducer = function (state = InitalState, action) {

    let newObj = null;
    switch (action.type) {

        case AuthActions.GETCOMPLAINTS:
            newObj = Object.assign({}, state.complaints);
            newObj[action.payload['$key']] = action.payload;
            //
             console.log('Complaints---------------------------', Object.assign({}, state, { complaints: newObj }))
            return Object.assign({}, state, { complaints: newObj });

        case AuthActions.GETCRIMES:
            newObj = Object.assign({}, state.crimes);
            newObj[action.payload['$key']] = action.payload;
            //console.log('Crimes---------------------------', Object.assign({}, state, { crimes: newObj }))
            return Object.assign({}, state, { crimes: newObj });
             
        case AuthActions.GETMISSING:
            newObj = Object.assign({}, state.missings);
            newObj[action.payload['$key']] = action.payload;
            //console.log('Missing---------------------------', Object.assign({}, state, { missings: newObj }))
            return Object.assign({}, state, { missings: newObj });

        case AuthActions.GETREPORTS:
            console.log('ALL REPORTS-----', action.payload);
            newObj = Object.assign({}, state.reports);
            newObj[action.payload['$key']] = action.payload;
            return Object.assign({}, state, { reports: newObj });
      
       case AuthActions.DELETE_REPORTS_EVENT:
           // console.log('StudentAction.DELETEDVACANCY_EVENT ----------', action.payload)
            newObj = Object.assign({}, state.reports);
            delete newObj[action.payload.$key];
            return Object.assign({}, state, { reports: newObj });

        case AuthActions.UPDATE_REPORTS_EVENT:
            newObj = Object.assign({}, state.reports);
            newObj[action.payload['$key']] = action.payload;
            // console.log('StudentAction.ADDALLVACANCIES STUDENT ADMIN---------------------------', Object.assign({}, state, { vacancies: newObj }))
            return Object.assign({}, state, { reports: newObj });

   case AuthActions.GETUSERREPORTS:
           // console.log('uSER REPORTS-----', action.payload);
            newObj = Object.assign({}, state.userReports);
            newObj[action.payload['$key']] = action.payload;
            return Object.assign({}, state, { userReports: newObj });
        
        case AuthActions.GETUSERS:
           // console.log('uSER REPORTS-----', action.payload);
            newObj = Object.assign({}, state.users);
            newObj[action.payload['$key']] = action.payload;
            return Object.assign({}, state, { users: newObj });

        default:
            return state;

    }
}

