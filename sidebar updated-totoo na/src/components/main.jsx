import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./main.css";
import axios from "axios";
import { useUserContext } from "../context/usercontextprovider";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ activePage, setActivePage, onLogout }) => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { userInfo } = useUserContext();
    
    const allMenuItems = [
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
            id: "recommending",
            label: "Recommending Approval",
            icon: "□",
            section: "menu",
            path: "/main/recommending-approval",
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

    // Function to filter menu items based on user role
    const getMenuItemsForRole = (userRole) => {
        const roleMenuMap = {
            'Admin': ['Dashboard', 'Records', 'Request Management', 'Reports', 'Properties', 'User Management'],
            'Student': ['Dashboard', 'Reservation Forms', 'Records'],
            'Faculty/Office Assistant': ['Dashboard', 'Reservation Forms', 'Records'],
            'Faculty/Org Adviser': ['Dashboard', 'Reservation Forms', 'Records', 'Recommending Approval'],
            'Heads/Deans': ['Dashboard', 'Reservation Forms', 'Records', 'Recommending Approval'],
            'GSO Officer': ['Dashboard', 'Reservation Forms', 'Records', 'Recommending Approval']
        };

        const allowedItems = roleMenuMap[userRole] || [];
        
        return allMenuItems.filter(item => 
            allowedItems.includes(item.label) || item.label === 'Logout'
        );
    };

    // Get filtered menu items based on user role
    const menuItems = userInfo?.role ? getMenuItemsForRole(userInfo.role) : allMenuItems;

    const handleItemClick = (item) => {
        if (item.label === "Logout") {
            // Show confirmation dialog before logging out
            const confirmLogout = window.confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                onLogout();
            }
        } else {
            setActivePage(item.label);
            navigate(item.path);
        }
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`h-screen bg-white flex flex-col shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : ''}`}>
            <div className="side">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                        {!isCollapsed && (
                            <>
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
                            </>
                        )}
                        {isCollapsed && (
                            <div className="flex justify-center">
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
                        )}
                    </div>
                    
                    {/* Hamburger Menu Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                        aria-label="Toggle sidebar"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-gray-600"
                        >
                            <path
                                d="M3 12H21M3 6H21M3 18H21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {!isCollapsed && (
                    <>
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
                    </>
                )}

                {/* Collapsed state - show only icons */}
                {isCollapsed && (
                    <div className="flex-1 overflow-y-auto p-2">
                        {menuItems
                            .filter((item) => item.section === "menu")
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className={`menu-item justify-center ${
                                        activePage === item.label ? "active" : ""
                                    }`}
                                    onClick={() => handleItemClick(item)}
                                    title={item.label}
                                >
                                    <span
                                        className={`${
                                            activePage === item.label
                                                ? "text-blue-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {item.icon}
                                    </span>
                                </div>
                            ))}
                        
                        {/* Others section for collapsed */}
                        <div className="mt-4">
                            {menuItems
                                .filter((item) => item.section === "others")
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className={`menu-item justify-center ${
                                            activePage === item.label ? "active" : ""
                                        }`}
                                        onClick={() => handleItemClick(item)}
                                        title={item.label}
                                    >
                                        <span
                                            className={`${
                                                activePage === item.label
                                                    ? "text-blue-500"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {item.icon}
                                        </span>
                                    </div>
                                ))}
                        </div>

                        {/* Footer section for collapsed */}
                        <div className="mt-auto pt-4">
                            {menuItems
                                .filter((item) => item.section === "footer")
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        className="menu-item justify-center"
                                        onClick={() => handleItemClick(item)}
                                        title={item.label}
                                    >
                                        <span className="text-blue-500">
                                            {item.icon}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
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
            // Even if the API call fails, still logout locally
            logout();
            localStorage.removeItem("active");
            navigate("/login");
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
            <div className="flex-1 p-4 contents">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;