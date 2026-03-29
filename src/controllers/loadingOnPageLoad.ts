import { useEffect, useState } from "react";

export const loadingOnPageLoad = (setLoading)=>{
    const randomNum = Math.random()*3000 + 2000; //generating millisecond between 2000 to 5000
    console.log(randomNum);
    useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false)
      clearTimeout(timeoutId);
    }, randomNum)

    return () => { clearTimeout(timeoutId) };
  }, [])
}