import { useState } from "react";

// params:
// url:         str | url of fetch to be requested
// reqMethod:   str | HTTP request method (GET, POST, etc)
// bodyData:    obj | optional body data for request

export default function useFetch(url, reqMethod, bodyData) {   
    return async() => {
        
        const response = await fetch(url, {
            method: reqMethod,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData)
        });
    
        const data = await response.json();
    
        return [data, response.status];
    } 
}