import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import CGU from '../ConditionOfUs';

const renderWithChakra = (ui) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('ConditionOfUs Page', () => {
  it('renders the main heading for CGU', () => {
    renderWithChakra(<CGU />);
    const mainHeading = screen.getByRole('heading', {
      name: /conditions générales d’utilisation \(cgu\)/i,
    });
    expect(mainHeading).toBeInTheDocument();
  });

  it('renders the preamble section', () => {
    renderWithChakra(<CGU />);
    const preambleHeading = screen.getByRole('heading', { name: /préambule/i });
    const preambleText = screen.getByText(/les présentes conditions générales d’utilisation/i);
    expect(preambleHeading).toBeInTheDocument();
    expect(preambleText).toBeInTheDocument();
  });

  it('renders the mentions légales section', () => {
    renderWithChakra(<CGU />);
    const mentionsHeading = screen.getByRole('heading', { name: /article 1 – mentions légales/i });
    const mentionsText = screen.getByText(/le site et l’application sont édités par des élèves/i);
    expect(mentionsHeading).toBeInTheDocument();
    expect(mentionsText).toBeInTheDocument();
  });

  it('renders the RGPD section', () => {
    renderWithChakra(<CGU />);
    const rgpdHeading = screen.getByRole('heading', {
      name: /article 3 – traitement des données personnelles \(rgpd\)/i,
    });
    const rgpdText = screen.getByText(/neighborrow collecte et traite les données personnelles/i);
    expect(rgpdHeading).toBeInTheDocument();
    expect(rgpdText).toBeInTheDocument();
  });

  it('renders external links with correct href attributes', () => {
    renderWithChakra(<CGU />);
    const externalLink = screen.getByRole('link', { name: /http:\/\/neighborrow\.fr\//i });
    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveAttribute('href', 'http://neighborrow.fr/');
  });

  it('renders the contact email link', () => {
    renderWithChakra(<CGU />);
    const emailLink = screen.getByRole('link', { name: /neighborrow@contact\.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:neighborrow@contact.com');
  });

  it('renders the security measures section', () => {
    renderWithChakra(<CGU />);
    const securityHeading = screen.getByRole('heading', { name: /article 5 – sécurité des données/i });
    const securityText = screen.getByText(/neighborrow met en œuvre des mesures de sécurité/i);
    expect(securityHeading).toBeInTheDocument();
    expect(securityText).toBeInTheDocument();
  });

  it('renders the prohibited items section', () => {
    renderWithChakra(<CGU />);
    const prohibitedHeading = screen.getByRole('heading', {
      name: /article 7 – biens et annonces strictement interdits/i,
    });
    const prohibitedText = screen.getByText(/armes de toutes catégories/i);
    expect(prohibitedHeading).toBeInTheDocument();
    expect(prohibitedText).toBeInTheDocument();
  });

  it('renders the modification of CGU section', () => {
    renderWithChakra(<CGU />);
    const modificationHeading = screen.getByRole('heading', {
      name: /article 12 – modification des cgu/i,
    });
    const modificationText = screen.getByText(/neighborrow se réserve le droit de modifier/i);
    expect(modificationHeading).toBeInTheDocument();
    expect(modificationText).toBeInTheDocument();
  });
});