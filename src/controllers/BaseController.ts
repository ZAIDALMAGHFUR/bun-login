export class BaseController {
    static successResponse(data: any, message: string = "Success", code: number = 200) {
        return new Response(
            JSON.stringify({
                metaData: {
                    code,
                    message,
                },
                response: data,
            }),
            { status: code, headers: { "Content-Type": "application/json" } }
        );
    }

    static errorResponse(message: string, code: number = 400) {
        return new Response(
            JSON.stringify({
                metaData: {
                    code,
                    message,
                },
                response: null,
            }),
            { status: code, headers: { "Content-Type": "application/json" } }
        );
    }
}
