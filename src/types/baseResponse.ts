export interface BaseResponse<T> {
    success: boolean;
    message?: string;
    result?: T;
    error?: ErrorResponse<T>;
}

export interface ErrorResponse<E> {
    message?: string;
    code?: string;
    validationErrors?: E[];
}

export interface ValidationErrorsResponse {
    message: string;
    field: string;
}


