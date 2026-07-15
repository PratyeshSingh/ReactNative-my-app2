


export const getLoader= async ()=> {

    const data = await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for 2 seconds

    // return data;
    return {
        message: "Data loaded successfully!"
    }
}