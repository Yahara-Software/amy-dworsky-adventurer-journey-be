// Below are a set of global variables.
// Set up the string in a constant variable to improve readability and maintainability.
const directionStr = "15F6B6B5L16R8B16F20L6F13F11R";
// The starting points for the equation to calculate the Euclidean distance.
const startingPoint = { X: 0, Y: 0 };
// Extracted the representations for forward, backward, etc so they can easily be updated if changed.
const forward = "F";
const backward = "B";
const right = "R";
const left = "L";

// Below are the function expressions. Wrote Pure functions for maintainability and reuse.
// My first goal was to separate the step/direction pairs. I accomplish that with this function.
const separateDirections = (directionStr) => {
    // Initialized the array to be returned.
    // Note: Arrays are ordered, so if the order of the directions is relevant their order is maintained.
    let tempArr = [];
    // currentNum variable is outside the loop for numbers with multiple digits (doesn't reset on each loop)
    let currentNum = "";
    // Looping through the length of the array to check each character and break apart the string.
    // Used a for loop to access the strings using indices.
    for (let i = 0; i < directionStr.length; i++) {
        // Simplify reference to the current character + improve readability.
        let currentChar = directionStr[i];
        // Need to check if it is a number to separate the number from the letter.
        if (!isNaN(currentChar)) {
            // If it is a number, concat the number. This is for if there are multi digit numbers.
            currentNum += currentChar;
        } else {
            // If it is not a number interpolate the number and direction letter and push to the array.
            // Included a space between the number and letter to easily utilize split in the next phase.
            tempArr.push(`${currentNum} ${currentChar}`);
            // Reset the currentNum variable to an empty string.
            currentNum = "";
        }
    }
    // Return the tempArr so the value is accessible outside the function.
    return tempArr;
};

// The second step was to total all the steps for each direction.
const totalAllDirections = (directionArr) => {
    // I chose a dictionary data structure because of its key-value pair usability.
    let tempDict = { [forward]: 0, [backward]: 0, [left]: 0, [right]: 0 };
    // forEach made the most sense to me because it loops through each step/direction pair.
    // and performs the logic to access the direction (key) and add the step count (value).
    directionArr.forEach((direction) => {
        // Simple split method because I set up the string to contain a space between the step and direction.
        // Destructure for improved readability.
        let [stepCount, directionKey] = direction.split(" ");
        // Access the dictionary using the key and add the steps to the value.
        tempDict[directionKey] += parseInt(stepCount);
    });
    // return the dictionary
    return tempDict;
};

const findNetDirections = (directionDict) => {
    // This function calculates the net movement along the X and Y axis.
    // Forward (F) and backward (B) movements affect the Y axis, with forward being positive and backward negative.
    // Left (L) and right (R) movements affect the X axis, with right being positive and left negative.
    // The resulting object represents the net directional movement from the starting point.
    let tempDict = {
        Y: directionDict[forward] - directionDict[backward],
        X: directionDict[right] - directionDict[left],
    };
    return tempDict;
};

const findEuclideanDistance = (startingPoint, endingPoint) => {
    // This function calculates the Euclidean distance between two points.
    // It uses the coordinates of the starting and ending points, applying the Euclidean distance formula to compute the distance.
    // The formula involves squaring the differences in both the X and Y coordinates between the two points and summing these squares.
    // Then, it takes the square root of the sum.
    // The result is the straight-line distance between the starting and ending points.
    let tempEuclideanDistance = Math.sqrt(
        Math.pow(endingPoint["X"] - startingPoint["X"], 2) +
            Math.pow(endingPoint["Y"] - startingPoint["Y"], 2)
    );
    return tempEuclideanDistance;
};

// Below, the function expressions are called and their returned values are stored in variables.
// Wrote separateDirections function to be reusable.
const directionArr = separateDirections(directionStr);
// I considered two different approaches before deciding on one.
// I arrived at this approach because I imagined using north as a constant frame of reference to be more realistic.
// More how an actual adventurer would follow directions (using a compass).
const directionDict = totalAllDirections(directionArr);
const netDirectionDict = findNetDirections(directionDict);
const euclideanDistance = findEuclideanDistance(
    startingPoint,
    netDirectionDict
);
console.log(euclideanDistance);
