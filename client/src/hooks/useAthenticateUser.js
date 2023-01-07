import { useQuery } from '@tanstack/react-query';

export default function useAuthenticateUser(email, password) {
    return useQuery({
        queryKey: [email, password],
        queryFn: async() => {
            
            const response = await fetch("/checkUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password})
            });
        
            const data = await response.json();
            
            return data;
        } 
    })
}