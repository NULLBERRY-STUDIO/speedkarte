# Speedkarte

A German traffic violation calculator by Nullberry Studio.

## About

Speedkarte helps users calculate potential penalties, points, and license suspension risks based on their driving habits in Germany. The application follows German traffic regulations and provides educational information about the German point system.

## Features

- Calculate points, fines, and license ban risks based on speeding habits
- Support for different road types (urban, rural, highway)
- Frequency-based risk assessment
- Educational information about the German point system
- Multi-language support (English, German, Turkish, Arabic, Spanish, Russian, French, Polish, Urdu)
- Interactive changelog accessible from the version badge in footer
- Semantic versioning (major.minor.patch)

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Development

To run this project locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd speedkarte

# Install dependencies
npm i

# Start the development server
npm run dev
```

### Version Management

This project uses semantic versioning:

- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features (backwards compatible)
- **Patch** (0.0.x): Bug fixes and small changes

To update the version number:

```sh
# Increment patch version (0.0.x)
npm run version:patch

# Increment minor version (0.x.0)
npm run version:minor

# Increment major version (x.0.0)
npm run version:major
```

The current version is displayed in the footer and clicking on it opens a changelog modal showing the project's development history.

## Deployment

This project is deployed via Cloudflare. The deployment configuration is managed through the `wrangler.toml` file.

## License

2025 Nullberry Studio. No rights reserved.

Made with care. No tracking, no cookies.
