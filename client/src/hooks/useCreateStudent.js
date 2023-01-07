import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateStudent(studentInfo) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await fetch("/newStudent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentInfo)
            })

            const data = response.json();

            return data;
        },

        onMutate: async (newStudent) => {
            //await queryClient.cancelQueries({ queryKey: [studentInfo.user] })
    
            const previousStudents = queryClient.getQueryData([studentInfo.user])
    
        
            queryClient.setQueryData([studentInfo.user], (old) => ({ ...old, students: [...old.students, {...newStudent, id: old.students.length}] }))
    
            return { previousStudents }
        },

        onError: (err, newStudent, context) => {
            queryClient.setQueryData([studentInfo.user], context.previousStudents)
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [studentInfo.user] });
        }
    })
}