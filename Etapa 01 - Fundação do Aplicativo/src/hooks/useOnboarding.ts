import { useCallback, useEffect, useState } from "react";
import { onboardingService } from "../services/onboardingService";

export function useOnboarding() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    onboardingService.hasCompleted().then(setHasOnboarded);
  }, []);

  const complete = useCallback(async () => {
    await onboardingService.complete();
    setHasOnboarded(true);
  }, []);

  return { hasOnboarded, complete };
}
