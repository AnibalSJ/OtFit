# OtFit 👗📱

**AI-powered outfit suggestion app** — Upload photos of your clothes and let OtFit build outfits for you.

> 🚧 Currently in active development

---

## What is OtFit?

OtFit is a mobile application that helps users discover outfit combinations from their own wardrobe. Users upload photos of their clothing items, and the app uses AI to analyze them and suggest complete, coherent outfits based on what they already own.

No more standing in front of your closet not knowing what to wear.

---

## Features

- 📸 **Photo-based wardrobe** — Add clothing items by taking or uploading photos
- 🤖 **AI outfit suggestions** — Get personalized outfit combinations generated from your wardrobe
- 🗂️ **Wardrobe management** — Organize and browse your clothing catalog

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile Framework | React Native + Expo |
| Language | TypeScript |
| AI Integration | AI Vision API for image analysis and outfit generation |
| Navigation | Expo Router (file-based routing) |
| Testing | Jest |

---

## Project Structure

```
OtFit/
├── app/              # Screens and routing (Expo Router)
├── components/       # Reusable UI components
├── core/             # Business logic and AI integration
├── hooks/            # Custom React hooks
├── screens/          # App screens
├── assets/           # Images and static files
└── __tests__/        # Unit tests
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android emulator or physical device (or iOS simulator on Mac)

### Installation

```bash
# Clone the repository
git clone https://github.com/AnaRianOwO/OtFit.git
cd OtFit

# Install dependencies
npm install

# Start the development server
npx expo start
```

Then scan the QR code with **Expo Go** on your phone, or press `a` to open the Android emulator.

---

## Roadmap

- [x] Project architecture and setup
- [ ] Wardrobe photo upload flow
- [ ] AI outfit suggestion engine
- [ ] User authentication
- [ ] Outfit history and favorites
- [ ] Style preferences and filters
- [ ] Public launch on Google Play

