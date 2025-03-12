import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, VStack, Input, Textarea, NativeSelect, HStack } from '@chakra-ui/react';
import { Fieldset, FieldsetLegend } from '@chakra-ui/react/fieldset';
import { Field } from './ui/field';
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from '../components/ui/file-upload';
import useUploadImage from '../hooks/useUploadImage';

/**
 * 📌 **Composant dynamique pour générer des formulaires.**
 *
 * - Prend un **schéma de validation** (`zod`).
 * - Accepte une liste de **champs dynamiques** (`text`, `textarea`, `select`, `file`).
 * - Gère l'**upload d'images** et met à jour les données avant soumission.
 *
 * @component
 * @param {Object} props - Props du formulaire.
 * @param {Object} props.schema - Schéma de validation `zod`.
 * @param {Array} props.fields - Liste des champs à afficher.
 * @param {Function} props.onSubmit - Fonction appelée à la soumission.
 * @param {string} [props.submitLabel="Submit"] - Texte du bouton de soumission.
 * @param {boolean} props.loading - Indique si le formulaire est en cours de soumission.
 * @param {string} [props.title] - Titre optionnel du formulaire.
 * @param {Object} [props.defaultValues] - Valeurs par défaut du formulaire.
 * @param {Function} [props.onCancel] - Fonction appelée lors de l'annulation.
 * @returns {JSX.Element} - Composant de formulaire dynamique.
 */
const FormComponent = ({ schema, fields, onSubmit, submitLabel = 'Submit', loading, title, defaultValues, onCancel }) => {
  // ✅ Configuration du formulaire avec react-hook-form et validation zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema), defaultValues });

  // ✅ Effet pour réinitialiser le formulaire quand les valeurs par défaut changent
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  /**
   * 🔹 Soumission du formulaire avec gestion de l'image uploadée.
   * @param {Object} data - Données du formulaire.
   */
  const handleFormSubmit = async (data) => {
    console.log("Form Data before submit:", data);

    // ✅ Si une image a été uploadée, on met à jour le champ `picture`
    if (uploadedImageUrl) {
      data.picture = uploadedImageUrl;
    }

    await onSubmit(data);
    reset();
  };

  const { uploadImage, uploading } = useUploadImage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  /**
   * 📸 Gestion de l'upload d'image : dès qu'un fichier est sélectionné, on l'upload.
   */
  useEffect(() => {
    console.log("📸 Selected File:", selectedFile);
    const uploadSelectedFile = async () => {
      if (selectedFile) {
        const imageUrl = await uploadImage(selectedFile);
        console.log("✅ Uploaded Image URL:", imageUrl);
        if (imageUrl) {
          setUploadedImageUrl(imageUrl);
          const imageField = fields.some((f) => f.name === "picture")
            ? "picture"
            : "image_url";
          setValue(imageField, imageUrl);
        }
      }
    };
    uploadSelectedFile();
  }, [selectedFile, setValue, fields, uploadImage]);

  /**
   * 🔹 Fonction appelée lorsque l'utilisateur upload un fichier.
   * @param {File} file - Fichier sélectionné par l'utilisateur.
   */
  const handleFileUpload = async (file) => {
    const imageUrl = await uploadImage(file);
    console.log("Uploaded Image URL:", imageUrl);

    if (imageUrl) {
      const imageField = fields.some((f) => f.name === "picture") ? "picture" : "image_url";
      setValue(imageField, imageUrl);
    }
  };

  return (
    <Box p={6} maxW="md" mx="auto">
      <Fieldset.Root>
        {title && (
          <FieldsetLegend fontSize="lg" fontWeight="bold">
            {title}
          </FieldsetLegend>
        )}

        {/* 🔹 Formulaire dynamique */}
        <VStack spacing={4} as="form" onSubmit={handleSubmit(handleFormSubmit)}>
          {fields.map(({ name, label, type = 'text', options, helperText }) => (
            <Field
              key={name}
              label={label}
              helperText={helperText}
              errorText={errors[name]?.message}
              invalid={!!errors[name]}
            >
              {type === 'select' ? (
                <NativeSelect.Root>
                  <NativeSelect.Field bg="green.contrast" {...register(name)} placeholder={`Select ${label}`}>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              ) : type === 'textarea' ? (
                <Textarea bg="green.contrast" {...register(name)} placeholder={label} />
              ) : type === "file" ? (
                <FileUploadRoot onFileSelect={(file) => { setSelectedFile(file); handleFileUpload(file); }}>
                  <FileUploadTrigger>
                    <Button colorPalette="orange" isLoading={uploading}>Upload Image</Button>
                  </FileUploadTrigger>
                  <FileUploadList />
                </FileUploadRoot>
              ) : (
                <Input bg="green.contrast" {...register(name)} type={type} placeholder={label} />
              )}
            </Field>
          ))}
          {/* 🔹 Boutons d'action */}
          <HStack>
            <Button type="submit" colorPalette="teal" isLoading={loading}>
              {submitLabel}
            </Button>
            {onCancel && (
              <Button variant="outline" onClick={onCancel} isDisabled={loading}>
                Cancel
              </Button>
            )}
          </HStack>
        </VStack>
      </Fieldset.Root>
    </Box>
  );
};

export default FormComponent;
