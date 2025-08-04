# MindCare Admin Features

## Overview
The MindCare application now includes a comprehensive admin panel for managing users and journal entries.

## Admin Routes

### Public Homepage (`/`)
- Welcome message with mental health quote
- Login and Register buttons
- Responsive design matching the existing theme

### Admin Login (`/admin/login`)
- Separate admin authentication endpoint (`/admin/login`)
- Uses same styling as regular login
- Redirects to admin dashboard on success

### Admin Dashboard (`/admin/dashboard`)
- Protected route requiring admin authentication
- Sidebar navigation with admin-specific links
- User management with ban/unban functionality
- Journal management with delete functionality
- Statistics overview
- Responsive design for mobile devices

## API Endpoints

The admin panel expects the following backend endpoints:

### Authentication
- `POST /admin/login` - Admin login

### User Management
- `GET /admin/users` - Get all users
- `PATCH /admin/users/:id/ban` - Ban a user
- `PATCH /admin/users/:id/unban` - Unban a user

### Journal Management
- `GET /admin/journals` - Get all journal entries
- `DELETE /admin/journals/:id` - Delete a journal entry

## Features

### User Management
- View all registered users
- See user status (active/banned)
- Ban/unban users with one click
- User information display (name, email, status)

### Journal Management
- View all journal entries across all users
- Content preview for each entry
- Delete inappropriate content
- User association tracking

### Admin Interface
- Clean, responsive sidebar navigation
- Statistics dashboard
- Quick action buttons
- Success/error message handling
- Mobile-responsive design

## Security

- Admin routes are protected with `ProtectedAdminRoute`
- Separate admin authentication flow
- JWT token-based authentication
- Automatic redirect to admin login for unauthorized access

## Styling

All admin components use the existing MindCare design system:
- CSS variables for consistent theming
- Existing button and form styles
- Responsive breakpoints
- Dark/light theme support

## Usage

1. Navigate to `/admin/login` to access admin panel
2. Use admin credentials to authenticate
3. Access dashboard at `/admin/dashboard`
4. Manage users and journals through the interface
5. Use sidebar navigation for different sections

## Development Notes

- Placeholder data is used when API endpoints are not available
- Error handling includes fallback to demo data
- All components are modular and reusable
- Follows existing React patterns and folder structure 