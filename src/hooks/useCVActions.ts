import { useDeleteCVMutation, useToggleFavoriteMutation } from "../redux/features/cv/cvApi";
import toastShow from "../utils/toastShow";

export function useCVActions() {
    const [deleteCV] = useDeleteCVMutation();
    const [toggleFavorite] = useToggleFavoriteMutation();

    const handleToggleFavorite = async (id) => {
        try {
            const response = await toggleFavorite(id).unwrap();
            if (response.success) toastShow(response.message, "success");
            else toastShow(response.message, "error");
        } catch {
            toastShow("Could not toggle favorite. Please try later!", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this CV? This action cannot be undone.")) return;
        try {
            const response = await deleteCV(id).unwrap();
            if (response.success) toastShow(response.message, "success");
            else toastShow(response.message, "error");
        } catch {
            toastShow("Not deleted. Please try later!", "error");
        }
    };

    return { handleToggleFavorite, handleDelete };
}