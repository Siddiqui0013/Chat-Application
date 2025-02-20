import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface User {
    clerkId?: string;
    _id?: string;
    profilePic: string;
    name: string;
    email: string;
}

export default function ChatScreen() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users/getUsers");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex h-screen border-2 overflow-hidden border-gray-300">
            <div className="w-[600px]">
            <Sidebar users={users} />
            </div>
            <main className="flex-1 p-4 bg-white">
                <h1 className="text-2xl">Chat Screen</h1>
                {/* Your chat messages and input area go here */}
            </main>
        </div>
    );
}
