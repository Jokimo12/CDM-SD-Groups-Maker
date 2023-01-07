import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateUser(email, password) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async() => {
            const response = await fetch("/newUser", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = response.json();

            return data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [email, password] });
        }
    })
}