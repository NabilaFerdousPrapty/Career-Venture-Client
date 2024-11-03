import React, { useState } from 'react';

const OnlineResumeBuilder = () => {
    // State to hold user input data
    const [resumeData, setResumeData] = useState({
        personalInfo: { name: '', email: '', phone: '' },
        education: { degree: '', institution: '', graduationYear: '' },
        experience: { jobTitle: '', company: '', yearsWorked: '' },
    });

    // Handle input change for each section
    const handleInputChange = (section, field, value) => {
        setResumeData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value,
            },
        }));
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Online Resume Builder</h1>

            {/* Personal Information Section */}
            <section>
                <h2>Personal Information</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                />
            </section>

            {/* Education Section */}
            <section>
                <h2>Education</h2>
                <input
                    type="text"
                    placeholder="Degree"
                    value={resumeData.education.degree}
                    onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Institution"
                    value={resumeData.education.institution}
                    onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Graduation Year"
                    value={resumeData.education.graduationYear}
                    onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value)}
                />
            </section>

            {/* Work Experience Section */}
            <section>
                <h2>Work Experience</h2>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={resumeData.experience.jobTitle}
                    onChange={(e) => handleInputChange('experience', 'jobTitle', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={resumeData.experience.company}
                    onChange={(e) => handleInputChange('experience', 'company', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Years Worked"
                    value={resumeData.experience.yearsWorked}
                    onChange={(e) => handleInputChange('experience', 'yearsWorked', e.target.value)}
                />
            </section>

            {/* Display resume data */}
            <section>
                <h2>Resume Preview</h2>
                <p><strong>Name:</strong> {resumeData.personalInfo.name}</p>
                <p><strong>Email:</strong> {resumeData.personalInfo.email}</p>
                <p><strong>Phone:</strong> {resumeData.personalInfo.phone}</p>
                <p><strong>Degree:</strong> {resumeData.education.degree}</p>
                <p><strong>Institution:</strong> {resumeData.education.institution}</p>
                <p><strong>Graduation Year:</strong> {resumeData.education.graduationYear}</p>
                <p><strong>Job Title:</strong> {resumeData.experience.jobTitle}</p>
                <p><strong>Company:</strong> {resumeData.experience.company}</p>
                <p><strong>Years Worked:</strong> {resumeData.experience.yearsWorked}</p>
            </section>
        </div>
    );
};

export default OnlineResumeBuilder;
