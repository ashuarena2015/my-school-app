import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for User and Expense
interface User {
  id?: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

interface UsersState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  loginUser: User;
  userAttributes: any[];
  expensesCount?: number;
  totalExpenses?: number;
  currentUser: User | null;
  userCounter: {},
  students: User[],
  permissionOptions: any[];
  branches: any[];
  roleTypes: any[];
  classes: any[];
  subjectsClasses: any[];
  classTeachers: any[];
  birthdays: any[];
  userListTypeSelected: string | null;
  notifications: any[];
  isNewNotification: boolean
}

// Initial state with TypeScript
const initialState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: true,
  loginUser: {},
  userAttributes: [],
  students: [],
  currentUser: [],
  userCounter: {},
  permissionOptions: [],
  branches: [],
  roleTypes: [],
  classes: [],
  subjectsClasses: [],
  classTeachers: [],
  birthdays: [],
  userListTypeSelected: '',
  notifications: [],
  isNewNotification: false
};

// Create slice with TypeScript
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<{ users: User[] }>) => {
      state.users = action.payload.users;
    },
    getLoginDetails: (state, action: PayloadAction<{ user: User }>) => {
      state.loginUser = action.payload.user;
    },
    isLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.isLoading = action.payload.loading;
    },
    logoutUser: (state) => {
      state.loginUser = {};
    },
    getAllUsers: (state, action: PayloadAction<{ users: User[], userListTypeSelected: string }>) => {
      state.users = action.payload.users;
      state.userListTypeSelected = action.payload.userListTypeSelected || null;
    },
    getAllStudents: (state, action: PayloadAction<{ students: User[] }>) => {
      state.students = action.payload.students;
    },
    getUserDetail: (state, action: PayloadAction<{ user: User }>) => {
      state.currentUser = action.payload;
    },
    uploadProfilePhoto: (state, action: PayloadAction<{ userId: string; photoUrl: string }>) => {
      if (state.currentUser) {
        state.currentUser.profilePhoto = action.payload.photoUrl;
      }
    },
    schoolGeneralInfo: (state, action) => {
      state.userCounter = action.payload.userCounter;
      state.permissionOptions = action.payload.permissions;
      state.branches = action.payload.branches;
      state.roleTypes = action.payload.roleTypes;
      state.classes = action.payload.classes;
      state.subjectsClasses = action.payload.subjects;
      state.birthdays = action.payload.birthdays;
      state.notifications = action.payload.notifications || [];
    },
    getPermissions: (state, action) => {
      state.permissionOptions = action.payload;
    },
    getClassTeachers: (state, action) => {
      state.classTeachers = action.payload || []
    },
    getNotifications: (state, action) => {
      state.notifications = action.payload.notifications || [];
    },
    setNotificationStatus: (state, action) => {
      state.isNewNotification = action.payload || false;
    }
  },
});

// Export actions & reducer
export const { getUsers, isLoading, getLoginDetails, logoutUser, getUserDetail, uploadProfilePhoto, getAllStudents, schoolGeneralInfo, getNotifications } =
  usersSlice.actions;
export default usersSlice.reducer;
