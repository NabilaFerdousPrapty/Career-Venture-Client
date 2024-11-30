import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useTheme from "../../../hooks/UseTheme/UseTheme";
import Swal from "sweetalert2";

const ApplicationDetails = () => {
    const { id, jobId } = useParams();
    const axiosCommon = UseAxiosCommon();
    const { theme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // "interview" or "reject"
    const [selectedDate, setSelectedDate] = useState(null);
    const [feedback, setFeedBack] = useState("");
    const navigate = useNavigate();
    // Dynamic background color based on theme
    const themeStyles = {
        synthwave: "bg-purple-900 text-white",
        light: "bg-gray-100 text-black",
        dark: "bg-gray-800 text-white",
    };

    const {
        data: applicationDetails,
        isLoading: isApplicationLoading,
        isError: isApplicationError,
        error: applicationError,
    } = useQuery({
        queryKey: ["jobApplication", id],
        queryFn: async () => {
            const response = await axiosCommon.get(`/jobApplications/${id}`);
            return response.data;
        },
    });

    const {
        data: jobDetails,
        isLoading: isJobLoading,
        isError: isJobError,
        error: jobError,
    } = useQuery({
        queryKey: ["jobDetails", jobId],
        queryFn: async () => {
            if (jobId) {
                const response = await axiosCommon.get(`/jobOpenning/${jobId}`);
                return response.data;
            }
        },
        enabled: !!jobId,
    });

    const handleModalOpen = (type) => {
        setModalType(type);

        if (type === "interview") {
            setFeedBack(`Dear ${applicationDetails?.applicant_name},\n\nCongratulations! You have been shortlisted for an interview for the position of ${jobDetails?.title} at ${jobDetails?.company}. Please confirm your availability for the interview scheduled on the page you picked.`);
        } else if (type === "reject") {
            setFeedBack(`Dear ${applicationDetails?.applicant_name},\n\nThank you for applying for the position of ${jobDetails?.title} at ${jobDetails?.company}. After careful consideration, we regret to inform you that we have decided to proceed with other candidates. Best wishes for your future endeavors.`);
        }

        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setFeedBack("");
    };

    const handleSubmit = async () => {
        const responseData = {
            applicantName: applicationDetails?.applicant_name,
            applicantEmail: applicationDetails?.email,
            jobTitle: jobDetails?.title,
            interviewDate: modalType === "interview" ? selectedDate?.toISOString() : null,
            feedback: feedback || "No feedback provided",
            status: modalType === "interview" ? "Interview Scheduled" : "Rejected",
        };



        try {
            // First, submit the response to the job application
            const response = await axiosCommon.post("/jobApplicationResponse", responseData);
            if (response.status === 200) {
                // If the response is successful, update the application status to 'Reviewed'
                const updateStatusResponse = await axiosCommon.patch(`/jobApplications/statusChange/${id}`, {
                    status: "Reviewed",
                });

                if (updateStatusResponse.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: modalType === "interview"
                            ? `Interview scheduled on ${selectedDate?.toLocaleDateString()}`
                            : "Application rejected successfully.",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#3085d6",
                    });

                    // Redirect to the 'dashboard/allJobApplications' route after success
                    navigate("/dashboard/allJobApplications");  // Perform the redirection here
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to update status",
                        text: "Failed to update job application status to 'Reviewed'. Please try again.",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#d33",
                    });
                }
                setSelectedDate(null);
                setFeedBack("");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed!",
                    text: "Failed to submit response. Please try again.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#d33",
                });
            }
        } catch (error) {
            console.error("Error submitting response:", error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "An error occurred while submitting the response.",
                confirmButtonText: "OK",
                confirmButtonColor: "#d33",
            });
        }

        handleModalClose();  // Close the modal after completing the action
    };


    if (isApplicationLoading || isJobLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <ClockLoader />
            </div>
        );
    }

    if (isApplicationError || isJobError) {
        return (
            <p className="text-red-500 text-center">
                Error: {applicationError?.message || jobError?.message}
            </p>
        );
    }

    return (
        <div className={`container mx-auto p-6 border-2 bg-accent`}>
            <h1 className="text-2xl font-bold mb-6 text-primary text-center mt-3">Application Details</h1>

            <Tabs>
                <TabList>
                    <Tab>Applicant Information</Tab>
                    <Tab>Job Information</Tab>
                </TabList>

                <TabPanel>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-semibold mb-4 text-primary" >Applicant Information</h2>
                        <p className="text-primary"><strong>Name:</strong> {applicationDetails?.applicant_name}</p>
                        <p className="text-primary"><strong>Email:</strong> {applicationDetails?.email}</p>
                        <p className="text-primary"><strong>Phone:</strong> {applicationDetails?.phone}</p>
                        <p className="text-primary"><strong>Address:</strong> {applicationDetails?.address}</p>
                        <p><strong className="text-primary">Resume:</strong> <a href={applicationDetails?.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 bg-slate-200 px-2 py-1 border-blue-900 border-2 rounded-2xl">View Resume</a></p>
                        <p><strong className="text-primary">Portfolio:</strong> <a className="text-blue-500 bg-slate-200 px-2 py-1 border-blue-900 border-2 rounded-2xl" href={applicationDetails?.portfolio} target="_blank" rel="noopener noreferrer" >View Portfolio</a></p>
                    </div>
                </TabPanel>

                <TabPanel>
                    <h2 className="text-xl font-semibold mb-4 text-primary">Job Information</h2>
                    <p className="text-primary"><strong>Job Title:</strong> {jobDetails?.title}</p>
                    <p className="text-primary"><strong>Company:</strong> {jobDetails?.company}</p>
                    <p className="text-primary"><strong>Description:</strong> {jobDetails?.description}</p>
                </TabPanel>
            </Tabs>

            <div className="mt-6 flex space-x-4">
                <button
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg"
                    onClick={() => handleModalOpen("interview")}
                >
                    Call for Interview
                </button>
                <button
                    className="px-4 py-2 bg-amber-800 text-white rounded-lg"
                    onClick={() => handleModalOpen("reject")}
                >
                    Reject with Feedback
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-accent text-primary ">
                    <div
                        className={`rounded-lg p-6 w-96 bg-accent text-primary"
                            }`}
                    >
                        {modalType === "interview" ? (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Schedule Interview</h3>
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                />
                                <textarea
                                    className="w-full mt-4 border rounded-lg p-2"
                                    rows="4"
                                    placeholder="Enter interview feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedBack(e.target.value)}
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
                                        onClick={handleModalClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-amber-500 text-white rounded-lg"
                                        onClick={handleSubmit}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Reject Application</h3>
                                <textarea
                                    className="w-full border rounded-lg p-2"
                                    rows="4"
                                    placeholder="Enter rejection reason"
                                    value={feedback}
                                    onChange={(e) => setFeedBack(e.target.value)}
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        className="px-4 py-2 bg-amber-500 text-white rounded-lg mr-2"
                                        onClick={handleModalClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-amber-700 text-white rounded-lg"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDetails;
