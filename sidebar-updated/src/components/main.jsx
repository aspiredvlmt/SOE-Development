import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./main.css";
import axios from "axios";
import { useUserContext } from "../context/usercontextprovider";

// Define role-based permissions
const rolePermissions = {
    admin: [
        "dashboard",
        "records", 
        "request",
        "reports",
        "properties",
        "user"
    ],
    student: [
        "dashboard",
        "reservation",
        "records"
    ],
    "faculty/office assistant": [
        "dashboard",
        "reservation", 
        "records"
    ],
    "faculty/org adviser": [
        "dashboard",
        "reservation",
        "records",
        "recommending"
    ],
    "heads/deans": [
        "dashboard",
        "reservation",
        "records", 
        "recommending"
    ],
    "gso officer": [
        "dashboard",
        "reservation",
        "records",
        "recommending"
    ]
};

// eslint-disable-next-line react/prop-types
const Sidebar = ({ activePage, setActivePage, onLogout, onToggle }) => {
    const navigate = useNavigate();
    const { userRole } = useUserContext(); // Get user role from context
    const [isCollapsed, setIsCollapsed] = useState(false);
    
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
            id: "request",
            label: "Request Management",
            icon: "□",
            section: "menu",
            path: "/main/request-management",
        },
        {
            id: "recommending",
            label: "Recommending Approval",
            icon: "□",
            section: "menu",
            path: "/main/recommending-approval",
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

    // Filter menu items based on user role
    const getFilteredMenuItems = () => {
        if (!userRole) return []; // Return empty if no role
        
        const userRoleLower = userRole.toLowerCase();
        const allowedItems = rolePermissions[userRoleLower] || [];
        
        return allMenuItems.filter(item => {
            // Always show logout
            if (item.id === "logout") return true;
            // Show items that are in the user's permissions
            return allowedItems.includes(item.id);
        });
    };

    const menuItems = getFilteredMenuItems();

    const handleItemClick = (item) => {
        if (item.label === "Logout") {
            onLogout();
        } else {
            setActivePage(item.label);
            navigate(item.path);
        }
    };

    const toggleSidebar = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        onToggle(newCollapsedState); // Notify parent component
    };

    return (
        <div className={`h-screen bg-white flex flex-col shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="side">
                <div className={`p-4 border-b flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed && (
                        <div className="flex items-center">
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
                    )}
                    
                    {/* Hamburger Menu Icon */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-gray-600"
                        >
                            <path
                                d="M3 12h18M3 6h18M3 18h18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {!isCollapsed && (
                        <p className="text-xs font-semibold text-gray-400 px-2 py-1">
                            MENU
                        </p>
                    )}
                    {menuItems
                        .filter((item) => item.section === "menu")
                        .map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${
                                    activePage === item.label ? "active" : ""
                                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                onClick={() => handleItemClick(item)}
                                title={isCollapsed ? item.label : ''}
                            >
                                {isCollapsed ? (
                                    <span
                                        className={`${
                                            activePage === item.label
                                                ? "text-blue-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {item.icon}
                                    </span>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </div>
                        ))}
                </div>

                {/* Only show OTHERS section if there are items in it */}
                {menuItems.filter((item) => item.section === "others").length > 0 && (
                    <div className="p-2">
                        {!isCollapsed && (
                            <p className="text-xs font-semibold text-gray-400 px-2 py-1">
                                OTHERS
                            </p>
                        )}
                        {menuItems
                            .filter((item) => item.section === "others")
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className={`menu-item ${
                                        activePage === item.label ? "active" : ""
                                    } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                    onClick={() => handleItemClick(item)}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    {isCollapsed ? (
                                        <span
                                            className={`${
                                                activePage === item.label
                                                    ? "text-blue-500"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {item.icon}
                                        </span>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </div>
                            ))}
                    </div>
                )}

                <div className="p-2 mt-auto">
                    {menuItems
                        .filter((item) => item.section === "footer")
                        .map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${
                                    activePage === item.label ? "active" : ""
                                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                onClick={() => handleItemClick(item)}
                                title={isCollapsed ? item.label : ''}
                            >
                                {isCollapsed ? (
                                    <span className="text-blue-500">
                                        {item.icon}
                                    </span>
                                ) : (
                                    <>
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
                                    </>
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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

    const handleSidebarToggle = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    return (
        <div className="flex">
            <Sidebar
                activePage={currentPage}
                setActivePage={handlePageChange}
                onLogout={handleLogout}
                onToggle={handleSidebarToggle}
            />
            <div className={`flex-1 p-4 contents ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;