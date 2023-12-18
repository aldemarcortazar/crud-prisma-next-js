



export const helpHttp = async ( url: string, { method, body, headers }: RequestInit ) => {
    const response: Response =  await fetch(url, {
        method,
        body,
        headers
    });

    return await response.json();
}
