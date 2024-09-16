# ShiftMan - Shift Management Application

ShiftMan is a web application that allows healthcare providers to search for and apply to available shifts based on location proximity.

## Features

- Search for available shifts by ZIP code and distance
- View and apply to available shifts
- View shifts you've applied to
- Responsive design for mobile and desktop use

## Technology Stack

- Frontend: Next.js with React
- Backend: Next.js API routes
- Database: SQLite (in-memory for development)
- ORM: Sequelize
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/shiftman.git
   cd shiftman
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `app/`: Contains the main application code
  - `api/`: API routes for handling backend logic
  - `components/`: React components
  - `db.js`: Database configuration and models
  - `distance.js`: Utility functions for distance calculations
  - `page.js`: Main page component
- `public/`: Static assets

## API Endpoints

- `GET /api/search`: Search for available shifts
- `GET /api/my-shifts`: Retrieve shifts applied to by a provider
- `POST /api/apply`: Apply for a shift

## Database Models

- `Shift`: Represents a work shift
- `Application`: Represents a provider's application for a shift

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.