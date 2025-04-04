import { ACCOUNT_TYPE } from "../utils/constants";

export const    sidebarLinks = [
    {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: "VscAccount",
    },
    {
        id: 2,
        name: "Dashboard",
        path: "/dashboard/followers",
        // type: ACCOUNT_TYPE.INSTRUCTOR,
        // type: "Student"&&"Admin",
        icon: "VscDashboard",
    },
    {
        id: 3,
        name: "My Item",
        path: "/dashboard/my-items",
        // type: ACCOUNT_TYPE.INSTRUCTOR,
        // type: "Student"&&"Admin",
        icon: "VscVm",
    },
    {
        id: 4,
        name: "Add Item",
        path: "/dashboard/add-item",
        // type: ACCOUNT_TYPE.INSTRUCTOR,
        // type: "Student"&&"Admin",
        icon: "VscAdd",
    },
  
    {
        id: 5,
        name: "Bought Item",
        path: "/dashboard/purchase-activity",
        // type: ACCOUNT_TYPE.STUDENT,
        // type: "Student"&&"Admin",
        icon: "VscMortarBoard",
    },
    {
        id: 6,
        name: "Add PYQ",
        path: "/dashboard/AddPyq",
        // type: ACCOUNT_TYPE.STUDENT,
        type: "Admin",
        icon: "VscMortarBoard",
    },
    {
        id: 7,
        name: "Purchase History",
        path: "/dashboard/purchase-history  ",
        // type: ACCOUNT_TYPE.STUDENT,
        // type: "Student"&&"Admin",
        icon: "VscHistory",
    },
    {
        id: 8,
        name: "My Wish-List",
        path: "/dashboard/cart  ",
        // type: ACCOUNT_TYPE.STUDENT,
        // type: "Student"&&"Admin",
        icon: "VscHistory",
    },
    {
        id: 9,
        name: "Academics",
        path: "/dashboard/Academics",
        // type: ACCOUNT_TYPE.INSTRUCTOR,
        // type: "Student"&&"Admin",
        icon: "VscAdd",
    },
    {
        id: 10,
        name: "Add Category",
        path: "/dashboard/addcategory",
        // type: ACCOUNT_TYPE.STUDENT,
        type: "Admin",
        icon: "VscMortarBoard",
    },
];
