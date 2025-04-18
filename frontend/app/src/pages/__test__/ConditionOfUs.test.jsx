import { screen } from '@testing-library/react';
import { renderWithProvider } from '@/test/renderWithProvider';
import  { describe, it, expect} from 'vitest';
import CGU from '../ConditionOfUs';

describe('ConditionOfUs Page', () => {
  it('renders the main heading for CGU', () => {
    renderWithProvider(<CGU />);
    const mainHeading = screen.getByRole('heading', {
      name: /conditions générales d’utilisation \(cgu\)/i,
    });
    expect(mainHeading).toBeInTheDocument();
  });

  it('renders the preamble section', () => {
    renderWithProvider(<CGU />);
    const preambleHeadings = screen.getAllByRole('heading', { name: /préambule/i });
    expect(preambleHeadings.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/les présentes conditions générales d’utilisation/i)
    ).toBeInTheDocument();
  });

  it('renders the mentions légales section', () => {
    renderWithProvider(<CGU />);
    const mentionsHeading = screen.getByRole('heading', {
      name: /article 1 – mentions légales/i,
    });
    const mentionsText = screen.getByText(/le site et l’application sont édités par des élèves/i);
    expect(mentionsHeading).toBeInTheDocument();
    expect(mentionsText).toBeInTheDocument();
  });

  it('renders the RGPD section', () => {
    renderWithProvider(<CGU />);
    const rgpdHeading = screen.getByRole('heading', {
      name: /article 3 – traitement des données personnelles \(rgpd\)/i,
    });
    const rgpdText = screen.getByText(/neighborrow collecte et traite les données personnelles/i);
    expect(rgpdHeading).toBeInTheDocument();
    expect(rgpdText).toBeInTheDocument();
  });

  it('renders external links with correct href attributes', () => {
    renderWithProvider(<CGU />);
    const links = screen.getAllByRole('link', { name: /neighborrow\.hephel\.fr/i });
    expect(
      links.some((link) => link.getAttribute('href') === 'http://neighborrow.hephel.fr')
    ).toBe(true);
  });

  it('renders the contact email link', () => {
    renderWithProvider(<CGU />);
    const emails = screen.getAllByRole('link', { name: /neighborrow@contact\.com/i });
    expect(
      emails.some((link) => link.getAttribute('href') === 'mailto:neighborrow@contact.com')
    ).toBe(true);
  });

  it('renders the security measures section', () => {
    renderWithProvider(<CGU />);
    const securityHeading = screen.getByRole('heading', {
      name: /article 5 – sécurité des données/i,
    });
    const securityText = screen.getByText(/neighborrow met en œuvre des mesures de sécurité/i);
    expect(securityHeading).toBeInTheDocument();
    expect(securityText).toBeInTheDocument();
  });

  it('renders the prohibited items section', () => {
    renderWithProvider(<CGU />);
    const prohibitedHeading = screen.getByRole('heading', {
      name: /article 7 – biens et annonces strictement interdits/i,
    });
    const prohibitedText = screen.getByText(/armes de toutes catégories/i);
    expect(prohibitedHeading).toBeInTheDocument();
    expect(prohibitedText).toBeInTheDocument();
  });

  it('renders the modification of CGU section', () => {
    renderWithProvider(<CGU />);
    const modificationHeading = screen.getByRole('heading', {
      name: /article 12 – modification des cgu/i,
    });
    const modificationTexts = screen.getAllByText(/neighborrow se réserve le droit de modifier/i);
    expect(modificationHeading).toBeInTheDocument();
    expect(modificationTexts[0]).toBeInTheDocument();
  });
});
