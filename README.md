## Device Shake Counter Test Task by Ivan Khoroshylov


### Task Description:
Create a React application that tracks sharp device shakes using data from the accelerometer or gyroscope. Each shake should be counted and displayed as the total number of shakes on the screen. The app should also include an animation that visually responds to each shake.

### Technical Requirements:
- React
- TailwindCSS
- Sensors API

### Getting Started

First, run the development server with your browser.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Open [Preview on Vercel](https://shake-counter-jade.vercel.app/)

### Shake countering logic

Requirements:

- A shake be defined as a rapid change in acceleration along the X, Y, or Z axes (e.g., a jump of more than 15 m/s² on any axis).

If both conditions are met, the shake counter is updated.

```bash
motion.axis > shakeThreshold

currentTime - lastShakeTime > interval
```

Explanation:

- Jump is more than 15 m/s² on any axis.
- The jump time minus the previous jump time is greater than the interval.
