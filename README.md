# EOD Report Generator

An automated End-of-Day (EOD) report generator that integrates with Microsoft 365 to extract data from Teams messages and Outlook calendar events, compile them into structured reports, and send them via email.

## Features

- **Microsoft 365 Integration**: Secure OAuth 2.0 authentication with Microsoft Graph API
- **Data Extraction**: Pull meetings from Outlook calendar and messages from Teams chats/channels
- **Customizable Reports**: HTML and text report templates with configurable sections
- **Automated Scheduling**: Set up daily report generation with cron-based scheduling
- **Email Distribution**: Automatically send reports to specified recipients
- **Web Interface**: React-based UI for configuration and manual report generation
- **Security**: Encrypted data transit, no permanent storage of sensitive information

## Architecture

### Backend (Node.js)
- Express.js REST API
- Microsoft Graph SDK for M365 integration
- MSAL for authentication
- Winston for logging
- Node-cron for scheduling

### Frontend (React)
- Material-UI components
- React Router for navigation
- Axios for API communication
- Date picker for report selection

## Prerequisites

- Node.js 18+ and npm
- Microsoft 365 account with Teams and Outlook access
- Azure AD app registration with appropriate Graph API permissions

## Quick Start

### 1. Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com) > Azure Active Directory > App registrations
2. Create a new registration with these settings:
   - Name: "EOD Report Generator"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: `http://localhost:3001/auth/callback`

3. Note the Application (client) ID and Directory (tenant) ID

4. Generate a client secret in "Certificates & secrets"

5. Add API permissions in "API permissions":
   - Microsoft Graph (Delegated):
     - `User.Read`
     - `Mail.Read`
     - `Mail.Send`
     - `Calendars.Read`
     - `Chat.Read`
     - `Channel.ReadBasic.All`
     - `ChannelMessage.Read.All`

### 2. Environment Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd outlook
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your Azure AD app details:
   ```env
   AZURE_CLIENT_ID=your-client-id
   AZURE_CLIENT_SECRET=your-client-secret
   AZURE_TENANT_ID=your-tenant-id
   REDIRECT_URI=http://localhost:3001/auth/callback
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

### 3. Installation

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### 4. Development

Start the backend server:
```bash
cd backend
npm run dev
```

Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/health

## Production Deployment

### Using Docker Compose

1. Build and start all services:
   ```bash
   docker-compose up -d
   ```

2. The application will be available at http://localhost

### Manual Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Start the backend in production mode:
   ```bash
   cd backend
   NODE_ENV=production npm start
   ```

3. Serve the frontend build files with a web server (nginx, Apache, etc.)

## API Endpoints

### Authentication
- `GET /api/auth/login` - Get Microsoft login URL
- `GET /api/auth/callback` - Handle OAuth callback
- `POST /api/auth/logout` - Logout user

### Data
- `GET /api/data/user` - Get current user info
- `GET /api/data/calendar/:date` - Get calendar events for date
- `GET /api/data/messages/:date` - Get chat messages for date
- `GET /api/data/teams` - Get user's Teams
- `GET /api/data/teams/:teamId/channels` - Get team channels

### Reports
- `POST /api/reports/generate` - Generate report for date
- `POST /api/reports/send` - Generate and send report
- `GET /api/reports/preview/:date` - Preview report data

### Scheduling
- `POST /api/scheduler/schedule` - Create/update scheduled report
- `GET /api/scheduler/schedule/:userId` - Get user's schedule
- `DELETE /api/scheduler/schedule/:userId` - Remove user's schedule

## Configuration

### Report Configuration
- **Include Meetings**: Toggle calendar events in reports
- **Include Messages**: Toggle chat messages in reports
- **Max Items**: Limit number of meetings/messages included
- **Teams Channels**: Select specific channels to include

### Scheduling Configuration
- **Schedule Time**: Time of day to send reports (24-hour format)
- **Schedule Days**: Days of week to send reports
- **Recipients**: Email addresses to receive reports

### Privacy Settings
- **Message Content**: Include/exclude message text
- **Meeting Notes**: Include/exclude meeting descriptions
- **Anonymize**: Remove sender names from messages

## Security Considerations

1. **Data Privacy**: No sensitive data is stored permanently
2. **Authentication**: OAuth 2.0 with Microsoft identity platform
3. **Permissions**: Principle of least privilege for Graph API access
4. **Transport**: All API calls use HTTPS in production
5. **Error Handling**: Sensitive information not exposed in error messages

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check Azure AD app configuration
   - Verify client ID, secret, and tenant ID
   - Ensure redirect URI matches exactly

2. **Permission Denied**
   - Check Graph API permissions in Azure AD
   - Ensure admin consent is granted for organizational permissions

3. **No Data Retrieved**
   - Verify user has Teams/Outlook data for the selected date
   - Check API rate limits
   - Review application logs for detailed errors

### Logs

Backend logs are stored in `backend/logs/`:
- `combined.log` - All log levels
- `error.log` - Error logs only
- `scheduler.log` - Scheduled task logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review logs for error details
3. Create an issue in the repository with:
   - Description of the problem
   - Steps to reproduce
   - Error messages (sanitized)
   - Environment details