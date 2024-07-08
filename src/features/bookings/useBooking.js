import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { getSettings } from "../../services/apiSettings";

export default function useBooking() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  queryClient.prefetchQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, booking };
}
