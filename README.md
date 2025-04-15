
# Staff Sync Track - Staff Attendance Management System

## Overview

Staff Sync Track is a comprehensive staff attendance management system that enables organizations to efficiently track staff check-in/out activities, generate reports, and manage staff records. The system provides different interfaces for administrators and regular staff members.

## Features

### Authentication
- **User Login**: Staff members and administrators can sign in using their Staff ID, email, and password
- **User Registration**: New staff members can register for an account with role-based permissions
- **Persistent Login**: User credentials are saved locally, allowing users to log back in without re-registering

### Admin Features
- **Dashboard**: Overview of attendance stats, recent activity, and staff status
- **Staff Management**: View and manage staff members, including role assignment
- **Reports**: Generate and view attendance reports for all staff members
- **Analytics**: Visualize attendance data with charts and graphs

### Staff Features
- **Check In/Out**: Record daily attendance with automatic time tracking
- **Attendance History**: View personal attendance records
- **Submit Comments**: Submit absence or lateness explanations
- **Profile Management**: Update personal information and credentials

### General Features
- **Role-Based Access Control**: Different interfaces and permissions for admins vs. staff
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: All data is saved locally for demonstration purposes

## Technical Architecture

### Frontend
- Built with React and TypeScript
- Uses Tailwind CSS for styling
- Uses ShadCN UI component library
- State management through React Context API

### Data Storage
- Local storage for data persistence (can be extended to use a backend database)

## User Types

### Administrator
- Has access to all system features
- Can manage staff accounts
- Can view and generate reports
- Default login:
  - Staff ID: ADMIN001
  - Email: admin@example.com
  - Password: admin123

### Staff Member
- Limited access focused on personal attendance
- Can check in/out
- Can view personal attendance history
- Can update personal profile

## Setup and Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Start the development server using `npm run dev`
4. Access the application at http://localhost:5173/

## Usage Guide

### For Administrators
1. Log in with admin credentials
2. Use the sidebar to navigate between different sections
3. Monitor staff attendance from the dashboard
4. Manage staff accounts in the Staff section
5. Generate reports on attendance data

### For Staff Members
1. Sign up for a new account or log in with existing credentials
2. Use the Check In/Out feature to record daily attendance
3. View attendance history to monitor past records
4. Update profile information as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For any questions or issues, please contact [support@staffsynctrack.com](mailto:support@staffsynctrack.com).
