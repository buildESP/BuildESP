import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, VStack, Input, Textarea, NativeSelect, HStack, Image } from '@chakra-ui/react';
import { Fieldset, FieldsetLegend } from '@chakra-ui/react/fieldset';
import { Field } from './ui/field';
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from './ui/file-upload';
import { PasswordInput } from './ui/password-input';
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
const FormComponent = ({ schema, fields, onSubmit, submitLabel = 'Submit', loading, title, defaultValues, onCancel, entityType = "default", entityId = "default" }) => {
  // ✅ Configuration du formulaire avec react-hook-form et validation zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema), defaultValues });




  const { uploadImage, uploading } = useUploadImage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);


  /**
   * 🧠 Réinitialise le formulaire quand les valeurs par défaut changent (cas édition)
   */
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  /**
   * 🖼️ Initialise l'image déjà existante dans les valeurs par défaut (édition)
   */
  useEffect(() => {
    const fieldName = fields.some((f) => f.name === "picture") ? "picture" : "image_url";
    const defaultImage = defaultValues?.[fieldName];
    if (defaultImage) {
      setUploadedImageUrl(defaultImage);
    }
  }, [defaultValues, fields]);

  /**
   * 🧼 Libère les URL blob créées localement pour éviter les fuites mémoire
   */
  useEffect(() => {
    return () => {
      if (uploadedImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
    };
  }, [uploadedImageUrl]);

  /**
   * ✅ Soumission du formulaire :
   * - Upload l'image si un fichier est sélectionné
   * - Injecte l'URL de l'image au bon champ dans les données
   * - Appelle `onSubmit` avec les données complètes
   */
const handleFormSubmit = async (data) => {
  console.log("Form Data before submit:", data);

  // 🔍 Détermine dynamiquement le nom du champ image attendu
  const imageField = fields.some((f) => f.name === "picture") ? "picture" : "image_url";

  let imageUrl = null;

  const resolvedEntityType = entityType;
  const resolvedEntityId = entityId;
  // 📤 Upload du fichier si sélectionné
  if (selectedFile) {


    console.log("📤 Uploading image with:", {
      file: selectedFile,
      entityType: resolvedEntityType,
      entityId: resolvedEntityId,
    });

    const uploaded = await uploadImage(selectedFile, resolvedEntityType, resolvedEntityId);

    if (uploaded) {
      imageUrl = uploaded;
      setUploadedImageUrl(uploaded);
    }
  }

  // 🔁 Sinon, on récupère l'image déjà présente en édition
  if (!imageUrl) {
    imageUrl = defaultValues?.[imageField] || null;
  }

  // ✅ Injecte l'URL dans les données, ou supprime le champ si aucune image
  if (imageUrl) {
    data[imageField] = imageUrl;
  } else {
    delete data[imageField];
  }

  // 🪵 DEBUG : données envoyées
  console.log("✅ Data sent to onSubmit:", {
    ...data,
    debug_imageField: imageField,
    debug_imageValue: data[imageField],
    debug_selectedFile: selectedFile,
    debug_uploadedImageUrl: uploadedImageUrl,
    debug_defaultImage: defaultValues?.[imageField],
    debug_entityType: resolvedEntityType,
    debug_entityId: resolvedEntityId,
  });

  // 🚀 Envoie final des données
  await onSubmit(data);

  // 🔄 Réinitialisation du formulaire
  reset();
  setUploadedImageUrl(null);
  setSelectedFile(null);
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
                <>
                  <FileUploadRoot
                     inputProps={{
                      onChange: (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          const preview = URL.createObjectURL(file);
                          setUploadedImageUrl(preview);
                        }
                      },
                    }}
                  >
                    <FileUploadTrigger>
                      <Button colorPalette="orange" isLoading={uploading}>
                        Upload Image
                      </Button>
                    </FileUploadTrigger>
                    <FileUploadList />
                  </FileUploadRoot>

                  {/* 🖼️ Aperçu de l’image uploadée */}
                  {uploadedImageUrl && (
                    <Box mt={2} borderRadius="md" display="flex" justifyContent="center" overflow="hidden" border="1px solid" borderColor="gray.200">
                      <Image
                        src={uploadedImageUrl}
                        alt="Preview"
                        objectFit="contain"
                        maxH="200px"
                        mx="auto"
                        borderRadius="md"
                      />
                    </Box>
                  )}
                </>
          ) : type === "password" ? (
            <PasswordInput  bg="green.contrast" visible={false} {...register(name)} placeholder={label} />
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
