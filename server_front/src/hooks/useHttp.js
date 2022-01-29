import React,{useState,useCallback} from "react";

export const useHttp = () => 
{
    const request = useCallback(async (url,method='GET',body='null',headers={})=>
    {
        try
        {
            const resp = await fetch (url,
            {
                method : method,
                body : body,
                headers : headers
            })
            const data = await resp.json()
            return data
        }
        catch(e)
        {

        }
  
    },[])
        return request
}