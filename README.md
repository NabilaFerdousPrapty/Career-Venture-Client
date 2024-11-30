# Career Venture

Career Venture is a comprehensive platform dedicated to helping individuals with career development, job search, and mentorship opportunities. It offers a variety of services for job seekers, mentors, and employers, including job applications, mentorship bookings, personalized dashboards, and more.

This platform also includes features like language toggle, light/dark theme support, and payment integration with Stripe.

## Live Demo

Visit the live website here: [Career Venture](https://career-venture.web.app/)

## Table of Contents

1. [Roles and Permissions](#roles-and-permissions)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Getting Started](#getting-started)
7. [Contributing](#contributing)
8. [License](#license)

---

## Roles and Permissions

### Admin

The admin has the highest level of access to manage the platform. Their responsibilities include:

1. **Manage Users**

   - Block or unblock members.
   - Switch any member to admin or vice versa.
   - Approve or reject trainer applications.

2. **Mentor Management**

   - View all the applied mentors and approve or reject them.
   - View approved and rejected mentors.

3. **Job Management**

   - Post new job openings.
   - View all job applications for the openings.

4. **Bootcamp Management**

   - Add new bootcamps to the platform.
   - View and manage bootcamps.

5. **Transaction Management**

   - View all website transactions.
   - Approve or reject transactions.

6. **Profile Management**
   - View and update admin profile.

---

### Mentor

Mentors have access to manage their profile, resources, and mentorship slots. Their responsibilities include:

1. **Bootcamp Management**

   - Add new bootcamps to the platform.
   - Manage and update their bootcamp resources.

2. **Mentorship Management**

   - Manage one-on-one mentorship slots.
   - Add, update, and delete mentorship slots.
   - View sold mentorships.

3. **Feedback and Profile**
   - Submit feedback about the website.
   - Update mentor profile.

---

### Member

Members have access to job opportunities, mentorship slots, and feedback features. Their responsibilities include:

1. **Job Management**

   - Apply for jobs posted by employers.
   - View job application status and responses.

2. **Mentorship Management**

   - Apply to be a mentor.
   - View mentorship opportunities and apply.

3. **Bootcamp Management**

   - View wishlist and join bootcamps by paying via Stripe.

4. **Profile Management**
   - View and update profile.
   - View transactions and booked mentor slots.

---

## Features

### Admin Features

1. **User Management**
   - Block/unblock members.
   - Switch member roles between admin, mentor, and member.
2. **Mentor Approval**
   - View and manage mentor applications.
   - Approve or reject mentors.
3. **Job Management**

   - Post job openings for members to apply.
   - View job applications for posted jobs.

4. **Bootcamp Management**

   - Add new bootcamps.
   - Manage bootcamp listings.

5. **Transaction Approval**

   - View all transactions on the platform.
   - Approve or reject transactions.

6. **Profile Management**
   - Admin can update their profile information.

---

### Mentor Features

1. **Bootcamp Creation**
   - Add and manage bootcamps and resources.
2. **Mentorship Slot Management**
   - Manage, add, and delete one-on-one mentorship slots.
3. **Mentorship Sales**

   - View sold mentorships and revenue.

4. **Feedback & Profile Update**
   - Submit feedback about the website.
   - Update mentor profile information.

---

### Member Features

1. **Job Applications**

   - Apply for jobs posted by employers.
   - View job application responses and status.

2. **Mentorship Booking**

   - Book one-on-one mentorship sessions.
   - View and manage booked mentor slots.

3. **Bootcamp Enrollment**

   - Join bootcamps by paying via Stripe.

4. **Profile Management**

   - Update profile information.
   - View transactions, wishlist, and bootcamp enrollment.

5. **Feedback**
   - Submit feedback on the platform.

---

### Additional Features

1. **Light/Dark Theme Toggle**

   - Users can toggle between light and dark themes for better user experience.

2. **Language Toggle**

   - Toggle between different languages for content localization.

3. **Stripe Payment Integration**
   - Secure payments for joining bootcamps and accessing premium features via Stripe.

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, i18next (for localization), React Router, React Leaflet (for location-based maps)
- **Backend**: Node.js, Express.js, MongoDB, Firebase Authentication, Email.js
- **Payments**: Stripe Payment Gateway
- **File Hosting**: Cloudinary
- **Localization**: i18next
- **Map Integration**: React Leaflet

---

## Installation

### Clone the Repository

To get started, clone the client and server repositories:

```bash
git clone https://github.com/NabilaFerdousPrapty/Career-Venture-Client.git
git clone https://github.com/NabilaFerdousPrapty/Career-Venture-Server.git
```

### Install Dependencies

Navigate to both client and server directories and run:

```bash
npm install
```

---

## Environment Variables

Ensure you set the following environment variables in the `.env` file for both client and server.

### Client `.env`

```env
VITE_API_URL=<your-backend-api-url>
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
```

### Server `.env`

```env
MONGO_URI=<your-mongodb-uri>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

---

## Getting Started

### Run the Client

In the client directory, run:

```bash
npm run dev
```

### Run the Server

In the server directory, run:

```bash
npm start
```

---

## Contributing

We welcome contributions! Please fork the repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Notes:

- **Roles**: Clearly defines the three roles (Admin, Mentor, Member) with their respective permissions.
- **Features**: Describes detailed features of each role, including job applications, mentorship slots, profile management, bootcamp enrollment, and payment integration with Stripe.
- **Technologies**: Lists all technologies used in the frontend and backend for your platform.
- **Installation and Setup**: Provides clear steps to clone the repository, install dependencies, and run both client and server.

This `README.md` will help guide users, developers, and contributors to better understand the structure and usage of your **Career Venture** project.
