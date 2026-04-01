import { getCollection } from 'astro:content';
import { getPermalink } from './utils/permalinks';

export async function getHeaderData() {
  const quads = await getCollection('quad', ({ data }) => !data.draft);
  const leds = await getCollection('led', ({ data }) => !data.draft);

  const quadLinks = quads
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
    .map((item) => ({
      text: item.data.title,
      href: getPermalink(`/quads/${item.data.slug ?? item.id}`),
    }));

  const ledLinks = leds
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
    .map((item) => ({
      text: item.data.title,
      href: getPermalink(`/leds/${item.data.slug ?? item.id}`),
    }));

  const promoLinks = [...quads, ...leds]
    .filter((item) => item.data.promo)
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
    .map((item) => ({
      text: item.data.title,
      href:
        item.collection === 'quad'
          ? getPermalink(`/quads/${item.data.slug ?? item.id}`)
          : getPermalink(`/leds/${item.data.slug ?? item.id}`),
    }));

  return {
    links: [
      {
        text: 'Accueil',
        href: '/',
      },
      {
        text: 'Quads BENDA',
        links: [
          { text: 'Voir tous les quads', href: '/quads' },
          ...quadLinks,
        ],
      },
      {
        text: 'Leds & Accessoires',
        links: [
          { text: 'Voir tous les produits', href: '/leds' },
          ...ledLinks,
        ],
      },
      {
        text: 'Offres promo',
        links: [
          { text: 'Voir toutes les promos', href: '/promos' },
          ...promoLinks,
        ],
      },
      {
        text: 'Infos & Contact',
        href: '/contact',
      },
    ],
    actions: [
      {
        text: 'Demander une offre',
        href: '/contact',
      },
    ],
  };
}

export const footerData = {
  links: [
    {
      title: 'Navigation',
      links: [
        { text: 'Accueil', href: '/' },
        { text: 'Infos & Contact', href: '/contact' },
        { text: 'Offres promo', href: '/promos' },
      ],
    },
    {
      title: 'Catalogue',
      links: [
        { text: 'Quads BENDA', href: '/quads' },
        { text: 'Leds & accessoires', href: '/leds' },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Demander un essai', href: '/contact' },
        { text: 'Demander un devis', href: '/contact' },
        { text: 'Nous contacter', href: '/contact' },
      ],
    },
    {
      title: 'Informations',
      links: [
        { text: 'Mentions légales', href: '/mentions-legales' },
        { text: 'Politique de confidentialité', href: '/privacy' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Mentions légales', href: '/mentions-legales' },
    { text: 'Politique de confidentialité', href: '/privacy' },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
  ],
  footNote: `
    © LED Automotive · Fosses-la-Ville · Tous droits réservés.
  `,
};