# PiHead GUI

A modern, feature-rich vehicle head unit interface built with Electron and React. PiHead GUI provides a sleek, customizable dashboard for your vehicle's entertainment and control systems.

![PiHead GUI](public/electron-vite.svg)

## Features

### 🎵 Audio Control
- Advanced equalizer with multiple preset profiles
- Speaker balance/fade control
- Sound enhancement features:
  - Loudness compensation
  - Surround sound
  - Dynamic EQ
  - Road noise compensation
- Master volume control with mute functionality

### 👤 Profile Management
- Multiple user profiles support
- Customizable settings per profile
- Driver and passenger profile types
- Theme customization (Blue, Purple, Green, Orange)

### 🎨 Display Settings
- Brightness control with auto-adjustment
- Auto night mode based on time and location
- Glare reduction for bright conditions
- Screen timeout settings
- Standby display options
- Reverse camera integration

### ⚙️ System Features
- Wi-Fi and Bluetooth connectivity
- System updates management
- Storage monitoring
- Device diagnostics
- Notification management

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jaredthejellyfish/pihead-gui.git
cd pihead-gui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Development

This project uses:
- Electron for cross-platform desktop application
- React for the user interface
- TypeScript for type safety
- Vite for fast development and building
- TailwindCSS for styling
- SQLite for local data storage

### Project Structure
```
pihead-gui/
├── electron/          # Electron main process files
├── src/
│   ├── components/    # React components
│   ├── routes/        # Application routes
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── data/          # Static data and configurations
├── public/            # Static assets
└── dist/             # Build output
```

## Requirements
- Node.js 20 or higher

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
