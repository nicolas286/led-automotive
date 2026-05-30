import { getCollection } from 'astro:content';
import { getPermalink } from './utils/permalinks';

export async function getHeaderData() {
  const quads = await getCollection('quad', ({ data }) => !data.draft);
  const leds = await getCollection('led', ({ data }) => !data.draft);
  const motos = await getCollection('moto', ({ data }) => !data.draft);

  const ledLinks = leds
  .sort((a, b) =>
    a.data.title.localeCompare(b.data.title, 'fr', {
      sensitivity: 'base',
    })
  )
  .map((item) => ({
    text: item.data.title,
    href: getPermalink(`/leds/${item.data.slug ?? item.id}`),
    image: item.data.image,
  }));

  const promoLinks = [...quads, ...motos, ...leds]
  .filter((item) => item.data.promo)
  .sort((a, b) =>
    a.data.title.localeCompare(b.data.title, 'fr', {
      sensitivity: 'base',
    })
  )
  .map((item) => ({
    text: item.data.title,
    href:
      item.collection === 'quad'
        ? getPermalink(`/quads/${item.data.slug ?? item.id}`)
        : item.collection === 'moto'
          ? getPermalink(`/motos/${item.data.slug ?? item.id}`)
          : getPermalink(`/leds/${item.data.slug ?? item.id}`),
    image: item.data.image,
  }));

  return {
    links: [
      { text: 'Accueil', href: '/' },
      {
        text: 'Véhicules',
        links: [
          { text: 'Quads BENDA', href: '/quads',  image: '/media/quads/redstone-550-court/main.webp'},
          { text: 'Motos BENDA', href: '/motos/benda', image: '/media/motos/benda-avengers-125-cc-–-custom-v-twin/avengers.png'},
          { text: 'Motos MAG POWER', href: '/motos/mag-power', image: '/media/motos/magpower-bombers-50-cm³-e5/bombers-50-situation-6-ms-1024x768.jpg' },
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
        text: 'Promos',
        links: [
          { text: 'Voir toutes les promos', href: '/promos' },
          ...promoLinks,
        ],
      },
      { text: 'Contact', href: '/contact' },
      { text: 'Actualités', href: '/blog' },
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
        { text: 'Contact', href: '/contact' },
        { text: 'Offres promo', href: '/promos' },
        { text: 'Actualités', href: '/blog' },
      ],
    },
    {
      title: 'Catalogue',
      links: [
        { text: 'Quads BENDA', href: '/quads' },
        { text: 'Motos BENDA', href: '/motos/benda' },
        { text: 'Motos MAG POWER', href: '/motos/mag-power' },
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
    {
      ariaLabel: 'Facebook',
      icon: 'logos:facebook',
      href: 'https://www.facebook.com/profile.php?id=61563294435406',
    },
  ],
  footNote: `
    © LED Automotive · Fosses-la-Ville · Tous droits réservés. Site web réalisé par <a href="https://www.feralwebdesign.be" target="_blank">Féral</a>.
  `,
};