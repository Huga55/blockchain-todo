import { useCallback, useState } from "react";

export const useManageModal = (defaultOpen?: boolean) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return {
    handleOpen,
    handleClose,
    open,
  };
};
