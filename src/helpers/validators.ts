export const isValidUrl = (url: string) => {
    try {
        return Boolean(new URL(url))
    }
    catch (error: any) {
        return false
    }
}

export const isValidEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };