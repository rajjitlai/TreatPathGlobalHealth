/* eslint-disable no-unused-vars */
import { useState } from "react";
import { createContact } from "../lib/createContact";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setLoading(true);

        let newErrors = {};

        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.message) newErrors.message = "Message is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            await createContact(formData);  // Pass formData here
            setSuccessMessage("Your message has been sent successfully!");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            setErrors({ submit: "Failed to send message. Please try again later." });
        }

        setLoading(false);
    };

    return (
        <div className="container px-8 lg:px-16 pt-16 mx-auto" id="contact">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Get In Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info Card */}
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />
                    <div className="relative z-10">
                        <h4 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                            Contact Information
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Feel free to reach out to us. We are available for any inquiries or support with our advanced communication systems.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <FaEnvelope className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Email</p>
                                    <p className="text-gray-600 dark:text-gray-400">treatpathglobal@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <FaPhone className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Phone</p>
                                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-gradient-to-br from-secondary to-accent rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <FaMapMarkerAlt className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">Location</p>
                                    <p className="text-gray-600 dark:text-gray-400">Global Headquarters</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />
                    <div className="relative z-10">
                        <h4 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                            Send Us a Message
                        </h4>

                        {successMessage && (
                            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                <p className="text-green-700 dark:text-green-400 font-semibold">{successMessage}</p>
                            </div>
                        )}

                        {errors.submit && (
                            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                <p className="text-red-700 dark:text-red-400">{errors.submit}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-primary dark:focus:border-primary transition-colors duration-300"
                                    placeholder="Enter your name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-primary dark:focus:border-primary transition-colors duration-300"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-primary dark:focus:border-primary transition-colors duration-300"
                                    placeholder="Enter subject"
                                />
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-primary dark:focus:border-primary transition-colors duration-300 resize-none"
                                    rows="5"
                                    placeholder="Enter your message"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
