import { useState } from 'react';

interface User {
    clerkId?: string;
    _id?: string;
    profilePic: string;
    name: string;
    email: string;
}

interface SidebarProps {
    users: User[];
}

export default function Sidebar({ users }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`w-60 bg-gray-200 h-screen overflow-hidden box-sizing-border transition-transform duration-300 ${isCollapsed ? '-translate-x-[80%]' : ''}`}>
            <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">Chat Users</h2>
                <button onClick={toggleCollapse} className="focus:outline-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isCollapsed ? "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" : "M10 19l-7-7m0 0l7-7m-7 7h18"}
                        />
                    </svg>
                </button>
            </div>
            <ul className="overflow-y-auto h-[calc(100vh-80px)]">
                {users.map((user) => (
                    <li
                        key={user.clerkId || user._id}
                        className="p-2 hover:bg-gray-300 cursor-pointer"
                    >
                        <img src={user.profilePic} alt={user.name} className="w-8 h-8 rounded-full inline-block mr-2" />
                        <span className="inline-block">{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}