import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, VStack, Input, Textarea, NativeSelect  } from '@chakra-ui/react';
import { Fieldset, FieldsetLegend } from '@chakra-ui/react/fieldset';
import { Field } from './ui/field'

const FormComponent = ({ schema, fields, onSubmit, submitLabel = 'Submit', loading, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset(); // Réinitialise le formulaire après soumission réussie
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
              ) : (
                <Input {...register(name)} type={type} placeholder={label} />
              )}
            </Field>
          ))}

          <Button type="submit" colorScheme="blue" isLoading={loading}>
            {submitLabel}
          </Button>
        </VStack>
      </Fieldset.Root>
    </Box>
  );
};

export default FormComponent;
