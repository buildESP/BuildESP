import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, VStack, Input, Textarea, NativeSelect, HStack } from '@chakra-ui/react';
import { Fieldset, FieldsetLegend } from '@chakra-ui/react/fieldset';
import { Field } from './ui/field'

const FormComponent = ({ schema, fields, onSubmit, submitLabel = 'Submit', loading, title, defaultValues, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema), defaultValues });


  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
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
