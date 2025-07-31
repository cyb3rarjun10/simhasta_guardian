# Simhastha Guardian - Religious Gathering Safety App

A comprehensive web application designed to improve safety, mobility, health, and digital experience during large religious gatherings like Simhastha 2028.

## 🌟 Features

### Core Functionality
- **🏠 Home Dashboard**: Real-time crowd congestion monitoring with Google Maps integration, live alerts, safety tips, and push-style notifications
- **📷 Incident Reporting**: Form-based incident reporting with image upload and map location selection
- **📡 Emergency Band Scanner**: QR code scanning with SOS alert functionality for emergency response
- **🙏 Digital Seva**: Donation system and service request portal for darshan bookings and assistance
- **💬 Simhastha Chatbot**: Bilingual (English/Hindi) AI assistant with preset responses for common queries
- **🧠 Admin Dashboard**: Comprehensive monitoring system for incidents, SOS alerts, donations, and IoT bin status

### Key Capabilities
- Real-time crowd density visualization with color-coded zones
- Mock IoT integration for smart dustbin monitoring
- Bilingual support (English/Hindi)
- Mobile-first responsive design
- Simulated payment processing
- Emergency response coordination
- Live data updates and notifications

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Vite** for development and building

### Backend Simulation
- Local state management with mock data
- Simulated API responses for realistic UX
- Mock payment gateway integration
- Simulated real-time updates

### APIs & Services
- Google Maps API integration (with demo fallback)
- Mock IoT data feeds
- Simulated notification system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simhastha-guardian
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - Navigate to `http://localhost:5173` in your browser
   - The app will automatically open the main user interface
   - Access admin dashboard at `/admin`

## 📱 Usage Guide

### For Pilgrims/Users

1. **Home Dashboard**
   - View real-time crowd density on interactive map
   - Check live alerts and safety notifications
   - Review daily highlights and recommendations

2. **Report Incidents**
   - Select incident type (crowd surge, missing person, sanitation, medical, other)
   - Add detailed description and upload images
   - Select location on map and provide contact information

3. **Emergency Scanner**
   - Scan QR codes from emergency bands
   - View user profiles for emergency contacts
   - Send SOS alerts to response teams

4. **Digital Seva**
   - Make donations for various purposes (general, food, medical, sanitation)
   - Request services (darshan booking, lost & found, medical help, volunteer support)
   - Process payments through simulated gateway

5. **Chat Assistant**
   - Get information about timings, directions, health facilities
   - Switch between English and Hindi languages
   - Use quick question buttons for common queries

### For Administrators

1. **Access Admin Dashboard**
   - Navigate to `/admin` or click the settings icon in the header
   - Monitor all activities in real-time

2. **Incident Management**
   - View all reported incidents with status tracking
   - Update incident status (pending → investigating → resolved)
   - Contact reporters directly

3. **Emergency Response**
   - Monitor active SOS alerts
   - Update response status and coordinate help
   - Access user emergency contact information

4. **Financial Tracking**
   - View all donations with detailed information
   - Track donation purposes and amounts
   - Monitor transaction status

5. **Service Management**
   - Review and approve service requests
   - Manage darshan bookings and support requests
   - Track request fulfillment

6. **IoT Monitoring**
   - Monitor smart dustbin fill levels and battery status
   - Receive alerts for bins requiring attention
   - Auto-refresh capabilities for real-time data

## 🎨 Design Features

- **Apple-level aesthetics** with attention to detail
- **Saffron and blue color scheme** reflecting religious theme
- **Mobile-first responsive design** optimized for all devices
- **Smooth animations and micro-interactions**
- **Accessible design** with proper contrast ratios
- **Professional typography** with consistent spacing
- **Card-based layouts** with subtle shadows
- **Loading states and success confirmations**

## 🔧 Configuration

### Google Maps API
To enable full Google Maps functionality:
1. Get a Google Maps API key from Google Cloud Console
2. Replace `YOUR_API_KEY` in `src/App.tsx`
3. Enable Maps JavaScript API and Places API

### Customization
- Update mock data in `src/data/mockData.ts`
- Modify chatbot responses in `src/data/chatbotResponses.ts`
- Adjust styling in Tailwind classes throughout components
- Configure notification settings in `src/utils/notifications.ts`

## 📊 Demo Data

The application includes comprehensive mock data for demonstration:
- **Crowd zones** with different density levels
- **Sample incidents** with various types and statuses
- **SOS alerts** with emergency contact information
- **Donation records** with different purposes
- **Service requests** for darshan and assistance
- **IoT bin data** with realistic fill levels and battery status

## 🏗️ Architecture

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main app layout with navigation
│   ├── GoogleMap.tsx   # Google Maps integration
│   ├── LoadingSpinner.tsx
│   └── NotificationBanner.tsx
├── pages/              # Main application pages
│   ├── Home.tsx        # Dashboard with crowd monitoring
│   ├── IncidentReport.tsx
│   ├── Emergency.tsx   # QR scanner and SOS
│   ├── DigitalSeva.tsx # Donations and services
│   ├── Chat.tsx        # Bilingual chatbot
│   └── Admin.tsx       # Administrative interface
├── data/               # Mock data and responses
│   ├── mockData.ts
│   └── chatbotResponses.ts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

### Key Design Patterns
- **Component composition** for reusable UI elements
- **Mock service layer** for realistic data simulation
- **Responsive design patterns** with mobile-first approach
- **State management** using React hooks
- **Type safety** with comprehensive TypeScript interfaces

## 🔄 Development Workflow

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Responsive design patterns
- Accessible UI components

## 📱 Mobile Optimization

- **Bottom navigation bar** for easy thumb access
- **Touch-friendly interfaces** with appropriate tap targets
- **Optimized layouts** for small screens
- **Swipe gestures** where appropriate
- **Performance optimization** for mobile devices

## 🌐 Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **High contrast ratios** for text readability
- **Focus management** for better UX
- **Alt text** for images and icons

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop dist folder
- **GitHub Pages**: Use build folder for static hosting
- **Traditional hosting**: Upload dist folder contents

## 🔮 Future Enhancements

- **Real backend integration** with Node.js/Express
- **Database connectivity** for persistent data
- **Push notifications** for mobile devices
- **Offline functionality** with service workers
- **Multi-language support** expansion
- **Advanced analytics** and reporting
- **Integration with government APIs**
- **Real IoT sensor connectivity**

## 📞 Support

For technical support or queries:
- Create issues in the project repository
- Contact the development team
- Check documentation for common solutions

## 📄 License

This project is developed for the Simhastha 2028 religious gathering safety initiative.

---

**Built with ❤️ for the safety and well-being of pilgrims during Simhastha 2028**