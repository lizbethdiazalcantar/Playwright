export function generateRandomNumber(): string {
    return Math.floor(Math.random() * 1000000000).toString();
}

export function generateUniqueCourseName(baseName: string): string {
    const randomNumber = generateRandomNumber(); // Use the new helper function
    return `${baseName}_${randomNumber}`;
}

export function generateUniqueUsername(baseName: string): string {
    const randomNumber = generateRandomNumber(); // Use the new helper function
    return `${baseName}_${randomNumber}`;
}

//This function adds a randomNumber to the end of a string; you can use it to make any value uniqueish.
export function generateRandomString(base: string): string {
    const randomNumber = generateRandomNumber(); // Use the new helper function
    return `${base}_${randomNumber}`;
}