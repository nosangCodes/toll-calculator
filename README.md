![Screenshot from 2023-12-10 20-15-01](https://github.com/nosangdev/toll-calculator/assets/141858330/c4c263bb-0a9c-4da3-acea-cd450ae85f7d)

## [Toll Calculator](https://toll-calculator-silk.vercel.app/)

This documentation provides a guide on how to use our toll tax calculator feature to plan your journeys and estimate toll costs.

## How to use?

1. Enter Start Location
2. Enter Waypoints (optional)
3. Enter Destination
4. Select Vehicle
5. Submit

## External APi used

1. [Toll guru](https://tollguru.com/toll-api)
       to obtain toll information for various routes. This API allows us to provide you with up-to-date toll estimates based on your selected journey details.
2. [tomtom](https://developer.tomtom.com/products/places-api)
       to get a list of locations based on the search query.

   
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
