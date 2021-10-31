interface EsInfo {
    '@timestamp': string;
    message: string;
    pid: number;
    host: string;
    tags?: string[];
    err?: string;
    level?: string;
    name?: string;
    request?: {
        method: string;
        url: string;
        normalizedUrl: string;
        remoteAddress: string;
    };
    response?: {
        statusCode: number;
        responseTime: number;
        fullHeaders: string;
    };
}

export default EsInfo