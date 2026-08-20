import { updateUserProfile } from "@/app/api/updateUserProfile";
import { uploadProfileImage } from "@/app/api/uploadProfileImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      nickname,
      profileImage,
    }: {
      id: string;
      nickname: string;
      profileImage: File | null;
    }) => {
      // 사용자가 업로드한 이미지 url 변수
      const imageUrl = profileImage
        ? await uploadProfileImage(id, profileImage)
        : undefined;

      return updateUserProfile({
        id,
        nickname,
        profile_image: imageUrl,
      });
    },
    onSuccess: (_, variables) => {
      toast.success("프로필 수정 완료");
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.id],
      });
    },
  });
}
