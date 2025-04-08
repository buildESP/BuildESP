// src/components/tour/TourStep.jsx
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverTitle,
  PopoverCloseTrigger,
} from '@/components/ui/popover'
import { Box, Button, Stack } from '@chakra-ui/react'
import { useRef, useEffect } from 'react'
import { useTourStep } from '@/hooks/useTourStep'
const TourStep = ({ id, children }) => {
  const {
    isCurrent,
    isActive,
    title,
    description,
    isFirst,
    isLast,
    next,
    prev,
    stop,
  } = useTourStep(id)

  const anchorRef = useRef()

  useEffect(() => {
    if (isActive && isCurrent && anchorRef.current) {
      setTimeout(() => {
        anchorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 100)
    }
  }, [isActive, isCurrent])

  return (
    <Box ref={anchorRef} position="relative">
      {children}

      {isActive && isCurrent && (
        <PopoverRoot open>
          <PopoverTrigger>
            <Box position="absolute" top="0" left="0" width="1px" height="1px" />
          </PopoverTrigger>

          <PopoverContent>
            <PopoverCloseTrigger />
            <PopoverArrow />
            <PopoverBody>
              <PopoverTitle mb={2}>{title}</PopoverTitle>
              <Box fontSize="sm" mb={4}>{description}</Box>
              <Stack direction="row" justify="space-between">
                <Button size="sm" colorPalette="blue"  onClick={prev} isDisabled={isFirst}>Précédent</Button>
                {isLast ? (
                  <Button size="sm" colorPalette="green" onClick={stop}>Terminer</Button>
                ) : (
                  <Button size="sm" colorPalette="blue" onClick={next}>Suivant</Button>
                )}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      )}
    </Box>
  )
}


export default TourStep
