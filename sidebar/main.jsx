import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./main.css";
import axios from "axios";
import { useUserContext } from "../context/usercontextprovider";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ activePage, setActivePage, onLogout }) => {
    const navigate = useNavigate();
    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "□",
            section: "menu",
            path: "/main/dashboard",
        },
        {
            id: "reservation",
            label: "Reservation Forms",
            icon: "■",
            section: "menu",
            hasArrow: true,
            path: "/main/reservation-forms",
        },
        {
            id: "records",
            label: "Records",
            icon: "□",
            section: "menu",
            path: "/main/records/all",
        },
        {
            id: "request",
            label: "Request Management",
            icon: "□",
            section: "menu",
            path: "/main/request-management",
        },
        {
            id: "reports",
            label: "Reports",
            icon: "□",
            section: "menu",
            path: "/main/reports",
        },
        {
            id: "properties",
            label: "Properties",
            icon: "□",
            section: "others",
            path: "/properties",
        },
        {
            id: "user",
            label: "User Management",
            icon: "□",
            section: "others",
            path: "/main/user-management",
        },
        {
            id: "logout",
            label: "Logout",
            icon: "■",
            section: "footer",
            hasArrow: true,
        },
    ];

    const handleItemClick = (item) => {
        if (item.label === "Logout") {
            onLogout();
        } else {
            setActivePage(item.label);
            navigate(item.path);
        }
    };

    return (
        <div className="h-screen  bg-white flex flex-col shadow-md">
            <div className="side">
                <div className="p-4 border-b flex items-center">
                    <div className="mr-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M3 6L10 13L14 9L21 16"
                                stroke="#FF6B6B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10 13L5 18L14 9L19 4"
                                stroke="#FF6B6B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-blue-500">
                            KRONOS
                        </h1>
                        <p className="text-xs text-gray-500">
                            GSO Management System
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    <p className="text-xs font-semibold text-gray-400 px-2 py-1">
                        MENU
                    </p>
                    {menuItems
                        .filter((item) => item.section === "menu")
                        .map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${
                                    activePage === item.label ? "active" : ""
                                }`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="flex items-center">
                                    <span
                                        className={`mr-3 ${
                                            activePage === item.label
                                                ? "text-blue-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span
                                        className={
                                            activePage === item.label
                                                ? "font-medium"
                                                : ""
                                        }
                                    >
                                        {item.label}
                                    </span>
                                </div>
                                {item.hasArrow && (
                                    <span className="text-gray-400">&gt;</span>
                                )}
                            </div>
                        ))}
                </div>

                <div className="p-2">
                    <p className="text-xs font-semibold text-gray-400 px-2 py-1">
                        OTHERS
                    </p>
                    {menuItems
                        .filter((item) => item.section === "others")
                        .map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${
                                    activePage === item.label ? "active" : ""
                                }`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="flex items-center">
                                    <span
                                        className={`mr-3 ${
                                            activePage === item.label
                                                ? "text-blue-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span
                                        className={
                                            activePage === item.label
                                                ? "font-medium"
                                                : ""
                                        }
                                    >
                                        {item.label}
                                    </span>
                                </div>
                                {item.hasArrow && (
                                    <span className="text-gray-400">&gt;</span>
                                )}
                            </div>
                        ))}
                </div>

                <div className="p-2 mt-auto">
                    {menuItems
                        .filter((item) => item.section === "footer")
                        .map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${
                                    activePage === item.label ? "active" : ""
                                }`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3 text-blue-500">
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </div>
                                {item.hasArrow && (
                                    <span className="text-blue-500">&gt;</span>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

const Layout = () => {
    const { usertoken, logout, loginID } = useUserContext();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(() => {
        return localStorage.getItem("active") || "Dashboard";
    });

    const handleLogout = async () => {
        try {
            await axios.post(
                "/api/logout",
                {
                    id: loginID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                }
            );
            logout();
            localStorage.removeItem("active");
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        localStorage.setItem("active", page);
    };

    return (
        <div className="flex">
            <Sidebar
                activePage={currentPage}
                setActivePage={handlePageChange}
                onLogout={handleLogout}
            />
            <div className=" flex-1 p-4 contents">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
