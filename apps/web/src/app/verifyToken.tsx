export const verifyTokenClient = async (token: string | undefined) => {
    try {
        if (!token) {
            return false;
        }

        const response = await fetch('http://localhost:6570/api/authenticated-route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to verify token');
        }

        return true
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
};
