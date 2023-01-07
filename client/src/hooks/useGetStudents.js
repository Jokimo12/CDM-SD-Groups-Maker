import { useQuery } from '@tanstack/react-query';

export default function useGetStudents(user) {
    return useQuery({
        queryKey: [user],
        queryFn: async() => {
            const response = await fetch("/getStudents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({user: user})
            });
        
            const data = await response.json();
            
            return data;
        } 
    })
}