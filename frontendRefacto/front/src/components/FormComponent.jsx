import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, VStack, Input, Textarea, NativeSelect, HStack } from '@chakra-ui/react';
import { Fieldset, FieldsetLegend } from '@chakra-ui/react/fieldset';
import { Field } from './ui/field'
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from '../components/ui/file-upload';
import useUploadImage from '../hooks/useUploadImage';

const FormComponent = ({ schema, fields, onSubmit, submitLabel = 'Submit', loading, title, defaultValues, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema), defaultValues });


  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  const handleFormSubmit = async (data) => {
    console.log("Form Data before submit:", data); 
    if (uploadedImageUrl) {
      data.picture = uploadedImageUrl;
    }
    await onSubmit(data);
    reset();
  };

  const { uploadImage, uploading } = useUploadImage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);


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
                  <NativeSelect.Field {...register(name)} placeholder={`Select ${label}`}>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              ) : type === 'textarea' ? (
                <Textarea {...register(name)} placeholder={label} />
              ) : type == "file" ? (
                <FileUploadRoot onFileSelect={(file) => { setSelectedFile(file); handleFileUpload(file); }}>
                  <FileUploadTrigger>
                    <Button isLoading={uploading}>Upload Image</Button>
                  </FileUploadTrigger>
                  <FileUploadList />
                </FileUploadRoot>
              ) : (
                <Input {...register(name)} type={type} placeholder={label} />
              )}
            </Field>
          ))}
          <HStack>
            <Button type="submit" colorScheme="blue" isLoading={loading}>
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
