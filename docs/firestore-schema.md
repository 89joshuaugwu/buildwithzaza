# Firestore schema

## `profile` — single document at `profile/main`

| Field | Type | Notes |
|---|---|---|
| bio | string | |
| stats | map | real, computed counts — not decorative round numbers |
| resumeUrl | string | Cloudinary URL |
| currentlyBuilding | string | powers the live line in the deploy-log hero (Phase 2) |
| socials | map | |

## `projects`

| Field | Type | Notes |
|---|---|---|
| title, slug, summary | string | |
| category | string | `client` \| `product` \| `venture` \| `collaboration` |
| stack | string[] | |
| images | string[] | Cloudinary URLs |
| liveUrl, repoUrl | string | |
| featured | boolean | shows in the "Selected Work" strip |
| ventureSpotlight | boolean | shows in the "Ventures" section |
| order | number | |

## `testimonials`

name, role, quote, avatarUrl, projectId (ref)

## `messages`

| Field | Type | Notes |
|---|---|---|
| type | string | `contact` \| `hire` |
| name, email | string | |
| phone, whatsapp | string | optional, `hire` only |
| projectType | string | `mobile` \| `web` \| `ai` \| `other` — `hire` only |
| description | string | |
| contactPrefs | string[] | e.g. `["whatsapp", "email"]` |
| read | boolean | |
| createdAt | timestamp | |

## `products` — Phase 4

title, description, price, previewImages[], fileUrl, category

## `orders` — Phase 4

productId, buyerEmail, buyerName, amount, paystackRef, status (`pending` \| `paid` \| `delivered`), createdAt
