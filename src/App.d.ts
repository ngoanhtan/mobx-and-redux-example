declare global {
    interface Console {
        BrowserLog(message?: any, ...optionalParams: any[]): void
    }
}