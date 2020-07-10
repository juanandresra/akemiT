export function responseError(data: any) {
    return {
        error: true,
        data: data.map((e: any) => ({ property: e.property ,constraints: e.constraints }))
    }
}

export function responseSuccess(data: any) {
    return {
        success: true,
        data: data,
    };
}
