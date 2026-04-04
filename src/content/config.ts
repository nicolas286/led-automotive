import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const seoDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const quadCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/quad' }),
  schema: z.object({
    draft: z.boolean().optional(),

    title: z.string(),
    brand: z.string().default('BENDA'),
    model: z.string().optional(),
    slug: z.string().optional(),

    excerpt: z.string().optional(),
    description: z.string().optional(),

    price: z.number().optional(),
    priceLabel: z.string().optional(), // ex: "11.999 € TTC"
    promoPriceLabel: z.string().optional(),
    promo: z.boolean().optional(),

    featured: z.boolean().optional(),
    order: z.number().optional(),

    image: z.string(),
    gallery: z.array(z.string()).optional(),

    category: z.string().optional(), // ex: "Quad", "ATV", "SSV"
    subcategory: z.string().optional(),

    available: z.boolean().optional(),
    ctaLabel: z.string().optional().default('Demander un essai'),

    shortSpecs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),

    technicalSpecs: z
      .array(
        z.object({
          section: z.string().optional(), // ex: "Moteur", "Partie cycle", "Dimensions"
          items: z.array(
            z.object({
              label: z.string(),
              value: z.string(),
            })
          ),
        })
      )
      .optional(),

    standardEquipment: z.array(z.string()).optional(),

    related: z.array(z.string()).optional(),

    seo: seoDefinition(),
    metadata: metadataDefinition(),
  }),
});

const ledCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/led' }),
  schema: z.object({
    draft: z.boolean().optional(),

    title: z.string(),
    slug: z.string().optional(),

    excerpt: z.string().optional(),
    description: z.string().optional(),

    price: z.number().optional(),
    priceLabel: z.string().optional(),
    promoPriceLabel: z.string().optional(),
    promo: z.boolean().optional(),

    featured: z.boolean().optional(),
    order: z.number().optional(),

    image: z.string(),
    gallery: z.array(z.string()).optional(),

    category: z.string().optional(), // ex: "Barres LED", "Ampoules", "Accessoires"
    subcategory: z.string().optional(),

    compatibleWith: z.array(z.string()).optional(), // ex: ["Auto", "Quad", "Moto", "Utilitaire"]

    available: z.boolean().optional(),
    ctaLabel: z.string().optional().default('Demander un devis'),

    specs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),

    related: z.array(z.string()).optional(),

    seo: seoDefinition(),
    metadata: metadataDefinition(),
  }),
});

const accessoryCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/accessory' }),
  schema: z.object({
    draft: z.boolean().optional(),

    title: z.string(),
    slug: z.string().optional(),

    excerpt: z.string().optional(),
    description: z.string().optional(),

    price: z.number().optional(),
    priceLabel: z.string().optional(),
    promoPriceLabel: z.string().optional(),
    promo: z.boolean().optional(),

    featured: z.boolean().optional(),
    order: z.number().optional(),

    image: z.string(),
    gallery: z.array(z.string()).optional(),

    available: z.boolean().optional(),
    ctaLabel: z.string().optional().default('Demander un devis'),

    compatibleQuads: z.array(z.string()).optional(),

    specs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),

    seo: seoDefinition(),
    metadata: metadataDefinition(),
  }),
});

export const collections = {
  post: postCollection,
  quad: quadCollection,
  led: ledCollection,
  accessory: accessoryCollection,
};