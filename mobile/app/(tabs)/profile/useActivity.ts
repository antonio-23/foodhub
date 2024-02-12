import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMeasurements, updateMeasurements } from "../../../services/authAPI";

export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const { mutate: updateActivity, isLoading: isUpdating } = useMutation({
    mutationFn: updateMeasurements,
    onSuccess: () => {
      queryClient.invalidateQueries("phisicalActivity");
      queryClient.refetchQueries({ queryKey: ["phisicalActivity"] });
    },
    onError: (error) => {
      console.error("Error with updating activity:", error);
    },
  });

  return { updateActivity, isUpdating };
}

export function useActivity(id: string) {
  const { isLoading: isLoadingActivity, data: activity } = useQuery({
    queryKey: ["activity", id],
    queryFn: () => getMeasurements(id),
  });

  return { isLoadingActivity, activity };
}
