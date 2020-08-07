export class ResponseDefaultModel<T> {
    isSuccess: boolean;
    data: T;

    error: any;
    errorMessage: string;
}
