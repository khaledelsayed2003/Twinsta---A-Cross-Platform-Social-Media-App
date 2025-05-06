Twinsta - A Cross-Platform Social Media App

Overview

Twinsta is an Expo-based social media application built with React Native and TypeScript. It features photo sharing, real-time chat, user search, and engagement tools like likes, comments, and following. The app uses Clerk for authentication and Convex for a real-time backend, supporting iOS and Android.

Student Details:





Name: Khaled Elsayed



Student ID: 2104553



Course: COP4468 (Cross-Platform App Development)

Get Started

Prerequisites





Node.js (v16 or later)



Expo CLI



Android emulator (e.g., Android Studio) or iOS simulator (e.g., Xcode)



Expo Go for physical devices



Clerk account (for authentication)



Convex account (for backend)

Setup Instructions





Clone the Repository

git clone https://github.com/khaledelsayed2003/twinsta-app.git
cd twinsta-app



Install Dependencies

npm install



Configure Environment Variables





Create a .env.local file in the root directory.



Add the following variables with your own Clerk and Convex credentials:

EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CONVEX_DEPLOYMENT=dev:your_deployment_name_here # e.g., dev:your-project-name
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud



Obtain EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY from your Clerk dashboard.



Set up a Convex deployment at Convex and get CONVEX_DEPLOYMENT and EXPO_PUBLIC_CONVEX_URL from your project settings.



Start the Convex Backend (Optional for Local Development)





In a separate terminal, navigate to the convex folder and run:

npx convex dev



Update .env.local with the local deployment URL if needed (e.g., http://localhost:8080).



Start the App

npx expo start





Use Expo DevTools to open the app in:





Expo Go (scan QR code with your phone’s Expo Go app)



Android Emulator (select "a" in DevTools)



iOS Simulator (select "i" in DevTools)



Ensure your phone and development machine are on the same Wi-Fi network for Expo Go.



Run on a Physical Device





Install Expo Go on your phone from the App Store or Google Play.



Scan the QR code displayed by npx expo start using your phone’s camera or Expo Go.

Additional Notes





The app uses Expo Router for file-based routing. Edit files in the app directory to develop new features.



If using an emulator, ensure it’s configured (e.g., Android Virtual Device or iOS Simulator).



For production, build a standalone app using npx expo run:android or npx expo run:ios after setting up credentials.

Learn More





Expo Documentation



Clerk Documentation



Convex Documentation

Contribute

Fork this repository and submit pull requests. For issues, open a GitHub issue.



Thank you for trying Twinsta!



































































































<!-- # Welcome to Twinsta app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->
