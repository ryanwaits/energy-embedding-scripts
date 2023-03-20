import { getDocuments, getSlugs } from '@/lib/get-documents';

(async () => {
  const slugs = await getSlugs();
  const documents = await getDocuments(slugs);
  console.log(documents);
})();
