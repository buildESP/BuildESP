// FormModal.jsx
import {
  Dialog,
  Portal,
} from "@chakra-ui/react";

/**
 * 💬 Affiche une modale avec un formulaire à l'intérieur (via children).
 */
const FormModal = ({
  isOpen,
  onClose,
  title = "Modifier l’élément",
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {children}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default FormModal;
