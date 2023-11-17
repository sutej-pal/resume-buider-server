const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    avatar: {
        url: String,
        blank: Boolean
    },
    position: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    countryName: String,
    city: String,
    address: String,
    postalCode: String,
    birthPlace: String,
    birthDate: String,
    drivingLicense: String,
    nationality: String,
    email: String,
    profile: String,
    template: String,
    sectionsOrder: [
        {
            type: String
        }
    ],
    color: String,
    locale: String,
    gender: String,
    namePronunciation: String,
    addressPronunciation: String,
    resumeSubmissionDate: String,
    married: Boolean,
    numberOfDependents: Number,
    spouseObligation: Boolean,
    hideSkillLevel: Boolean,
    // "sectionTitles": {
    //     "details": "Personal dDetails",
    //     "profile": "Professional Summarfdf y"
    // },
    showPrefillResumeModal: Boolean,
    // "motivation": null,
    // "pr": null,
    // "qualifications": null,
    // "technicalSkills": null,
    // "skillsDescription": null,
    // "employerName": null,
    // "jobTitle": null,
    // "linkedin": null,
    // "jobPostingHostName": null,
    educations: [],
    courses: [],
    internships: [],
    activities: [],
    hobbies: [],
    references: [],
    socialProfiles: [],
    customSections: []
}, {
    timestamps: true,
});

const Resume = mongoose.model("Resume", Schema);

module.exports = Resume;








// "workExperiences": [
//     {
//         "id": 67632912,
//         "title": "dsd",
//         "employer": null,
//         "city": null,
//         "dateFrom": null,
//         "dateUntil": null,
//         "description": "<p>sdsdsfsd</p>",
//         "resumeId": 35250861,
//         "position": 1,
//         "isMonthUntilHidden": false,
//         "isDateUntilPresent": false,
//         "isMonthFromHidden": false,
//         "normalizedJobTitleId": null,
//         "reasonForResignation": null,
//         "plannedResignationDate": null,
//         "duration": null,
//         "department": null,
//         "employmentType": null,
//         "employerProfilesAttributes": {
//             "id": 13783375,
//             "businessType": null,
//             "foundationYear": null,
//             "capital": null,
//             "sales": null,
//             "noOfEmployee": null,
//             "stockListing": null,
//             "resumeWorkExperienceId": 67632912,
//             "position": null
//         },
//         "cid": null
//     },
// ],
// "skills": [
//     {
//         "id": 141518384,
//         "skill": "Project Management",
//         "level": "skillful",
//         "resumeId": 35250861,
//         "createdAt": "2023-10-08T12:19:36.518+02:00",
//         "updatedAt": "2023-10-08T12:19:43.106+02:00",
//         "position": 1,
//         "sourceAlgo": null,
//         "cid": null
//     },
// ],
// "languages": [
//     {
//         "id": 33135364,
//         "language": "English",
//         "level": "low_intermediate",
//         "resumeId": 35250861,
//         "createdAt": "2023-10-08T12:19:49.049+02:00",
//         "updatedAt": "2023-10-08T12:19:56.964+02:00",
//         "position": 1,
//         "certificate": null,
//         "certificateAcquisitionDate": null,
//         "cid": null
//     }
// ],