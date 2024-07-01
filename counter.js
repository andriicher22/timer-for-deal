// Set the time threshold which your timer shouldn't reach (in minutes)
const minRemaining = 7;
const minRemainingThreshold = minRemaining * 60 * 1000; // Threshold in milliseconds

/**
 * Timer function to ensure at least 7 minutes remaining until the next hour
 */
function countdownToNextHour() {
  const now = new Date();
  // Set custom time to check (for testing purposes)
  //now.setMinutes(59);
  console.log(now);
  // Calculate remaining time until the end of the hour
  let timeRemaining = calculateRemainingTime(now);
  console.log(timeRemaining / 1000 / 60);

  // Ensure at least 7 minutes remaining
  if (timeRemaining < minRemainingThreshold) {
    localCountdown(now);
  } else {
    // Set the remaining time in HTML
    setTimeDom(timeRemaining);
    // Run function once again in one second
    setTimeout(() => countdownToNextHour(), 1000);
  }
}

/**
 * Local countdown function to adjust the time if less than the threshold
 */
function localCountdown(now) {
  console.log('Local countdown');
  if (calculateRemainingTime(now) < minRemainingThreshold) {
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, minRemaining, 0, 0);
    setTimeDom(nextHour - now);
    setTimeout(() => localCountdown(new Date()), 1000);
  } else {
    countdownToNextHour();
  }
}

/**
 * Calculates the remaining milliseconds until the next hour
 */
function calculateRemainingTime(date) {
  const nextHour = new Date(date);
  nextHour.setHours(date.getHours() + 1, 0, 0, 0);
  return nextHour - date;
}

/**
 * Sets the remaining time in the HTML document
 */
function setTimeDom(timeRemaining) {
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);

  // Update the DOM elements in the HTML
  document.getElementById("hour").innerHTML = hours.toString().padStart(2, "0");
  document.getElementById("minute").innerHTML = minutes.toString().padStart(2, "0");
  document.getElementById("second").innerHTML = seconds.toString().padStart(2, "0");

  document.getElementById("hour2").innerHTML = hours.toString().padStart(2, "0");
  document.getElementById("minute2").innerHTML = minutes.toString().padStart(2, "0");
  document.getElementById("second2").innerHTML = seconds.toString().padStart(2, "0");
}

// Start the countdown
countdownToNextHour();
