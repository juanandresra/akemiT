import { __ } from "i18n";

export function responseError(data: any) {
    if (data.errno) {
        return {
            error: true,
            data: __("error")
        }
    }
    else {

        if (typeof data == 'string') {
            return {
                error: true,
                data: data
            }
        }
        try{
            return {
                error: true,
                data: data.map((e: any) => ({ property: e.property ,constraints: e.constraints }))
            }
        } finally {
            return {
                error: true,
                data: data
            }
        }
    }
}

export function responseSuccess(data: any) {
    return {
        success: true,
        data: data,
    };
}
