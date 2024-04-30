type User = {
    email: string;
    username: string;
    name: string;
    role?: string;
}

declare namespace Express {
    export interface Request {
        user?: User |any
    }
}

