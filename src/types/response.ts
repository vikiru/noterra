export type Response<T> =
    | { success: false; error: string }
    | { success: true; data: T };
