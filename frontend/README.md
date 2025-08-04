# MindCare Frontend

A beautiful React frontend for the MindCare journaling application with authentication, mood tracking, and journal management.

## Features

- 🌸 **Beautiful UI** - Warm, minimal color palette with smooth animations
- 🌙 **Dark/Light Mode** - Toggle between themes
- 🔐 **Authentication** - Register, OTP verification, and login
- 📝 **Journal Management** - Create, view, pin, and delete journal entries
- 😊 **Mood Tracking** - Select your current mood with emoji buttons
- 💭 **Daily Inspiration** - Random motivational quotes
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS Variables** - Theme switching and styling

## Color Palette

- **Background**: #EAE7DC (warm cream)
- **Light Brown**: #DBC3A5 (soft brown)
- **Warm Gray**: #8E8D8A (neutral gray)
- **Coral Accent**: #E98074 (coral)
- **Deep Red**: #E85A4F (red accent)

## Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation and theme toggle
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state
│   ├── pages/
│   │   ├── Register.jsx        # User registration
│   │   ├── Login.jsx           # User login
│   │   ├── Dashboard.jsx       # Main journal interface
│   │   └── Profile.jsx         # User profile
│   ├── services/
│   │   └── api.js              # API functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## API Endpoints

The frontend connects to these backend endpoints:

- `POST /auth/register` - User registration
- `POST /auth/verify-otp` - OTP verification
- `POST /auth/login` - User login
- `POST /journals` - Create journal entry
- `GET /journals` - Get all journals
- `PATCH /journals/:id/pin` - Toggle pin status
- `DELETE /journals/:id` - Delete journal entry

## Features in Detail

### Authentication Flow
1. User registers with name, email, password
2. OTP is sent to email
3. User verifies OTP to activate account
4. User can login with email and password
5. JWT token is stored in localStorage

### Dashboard Features
- **Mood Selector**: Choose from 8 different moods with emojis
- **Journal Form**: Create new entries with title and content
- **Inspirational Quote**: Random motivational quote each day
- **Journal List**: View all entries with pin/delete options
- **Responsive Layout**: Two-column layout on desktop

### Theme System
- Automatic theme persistence in localStorage
- Smooth transitions between light and dark modes
- CSS variables for consistent theming

## Development

The app uses Vite for fast development with:
- Hot module replacement
- Proxy configuration for API calls
- Optimized build process

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Note**: Make sure your backend server is running on `http://localhost:5000` before starting the frontend. 