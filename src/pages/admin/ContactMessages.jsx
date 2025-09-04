import { useEffect, useState } from "react";
import { getContacts } from "../../lib/getContacts";

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getContacts();
            setMessages(data);
            setLoading(false);
        };

        fetchMessages();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white text-gray-800 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-center">Contact Messages</h2>

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading messages...</p>
            ) : messages.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No messages found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-800">
                        <thead>
                            <tr className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                                <th className="border p-3 dark:border-gray-800">Name</th>
                                <th className="border p-3 dark:border-gray-800">Email</th>
                                <th className="border p-3 dark:border-gray-800">Subject</th>
                                <th className="border p-3 dark:border-gray-800">Message</th>
                                <th className="border p-3 dark:border-gray-800">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((msg) => (
                                <tr key={msg.$id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                    <td className="border p-3 dark:border-gray-800">{msg.name}</td>
                                    <td className="border p-3 dark:border-gray-800">{msg.email}</td>
                                    <td className="border p-3 dark:border-gray-800">{msg.subject}</td>
                                    <td className="border p-3 dark:border-gray-800">{msg.message}</td>
                                    <td className="border p-3 text-sm text-gray-500 dark:text-gray-400 dark:border-gray-800">
                                        {new Date(msg.$createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ContactMessages;
