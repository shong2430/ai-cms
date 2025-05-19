import { useCallback } from "react";

export default function useThrottle(func, delay){
    const ref = useRef(0);
    const throttleFunc = useCallback((...argu)=>{
        let curr = Date.now();
        if(curr - ref.current >= delay){
            func(...argu);
            ref.current = curr;
        }
    },[func, delay])
    return throttleFunc
}