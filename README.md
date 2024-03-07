# Multi-step process with better routing
This is a sample application to show how you might implement a multi-step process without having the scenario of a user being able to navigate back into the flow in a react application.

There are 2 "main" pages, `Home` and `Trips` to add some navigation to the history stack.

## Trips Page
This will render a hardcoded list of 3 "trips" that a user can "check in" to.
- Tapping a trip will take you to the detail page for that trip.
  - This detail page offers a "check in" button to launch a multi-step process
- Swiping a trip will reveal a "quick check in" button that will take you directly to the multi-step process.

## Navigation
You'll notice the following behavior once you are within the multi-step process:
- Clicking the browser back button, or hardware back button on Android, will exit the flow and take you back to the page you entered the process from.
  - This is either the trip detail page or the `Trips` page depending on how you arrived at the multi-step process.
- Swiping on iOS will navigate backwards through the multi-step process but not exit it.
- Cancelling or completing the process will take you to the same location as described above.
- After exiting the multi-step process, you'll notice that navigating backwards will not tack you back into the process.

## Developers
This repository assumes you have your environment setup properly for Ionic application development.

Run the following commands to run on the web
```bash
npm install
ionic serve
```

The iOS and Android platforms already exist, so you can launch and run those through their IDEs
```bash
ionic cap open android
ionic cap open ios
```