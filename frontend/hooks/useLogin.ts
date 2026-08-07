import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: AuthService.login,
  });
}