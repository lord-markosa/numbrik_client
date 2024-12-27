import { useState } from "react";

export const useDialog = () => {
    const [dialogProps, setDialogProps] = useState({
        isOpen: false,
        prompt: "",
        primaryButtonHandler: () => {},
        secondaryButtonHandler: () => {},
        blurHandler: () => {},
    });

    const closeDialog = () =>
        setDialogProps((prevProps) => ({
            ...prevProps,
            isOpen: false,
        }));

    return {
        dialogProps,
        requestDialog: async (prompt) => {
            return new Promise((resolve) => {
                setDialogProps({
                    isOpen: true,
                    prompt,
                    primaryButtonHandler: () => {
                        resolve("primary");
                        closeDialog();
                    },
                    secondaryButtonHandler: () => {
                        resolve("secondary");
                        closeDialog();
                    },
                    blurHandler: () => {
                        resolve("blurred");
                        closeDialog();
                    },
                });
            });
        },
    };
};
