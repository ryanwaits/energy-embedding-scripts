import { supabaseClient } from '@/server/supabase';
import { PromisePool } from '@supercharge/promise-pool';

import { openAi } from '@/config/openai';
import { extractTitle, getDocument, getSlugs } from '@/lib/get-documents';

export async function generateEmbeddings() {
  const slugs = await getSlugs();
  const data = await PromisePool.for(slugs)
    .withConcurrency(10)
    .process(async (slug) => {
      return getDocument(slug);
    });
  const documents = data.results;

  for (const document of documents) {
    const title = extractTitle(document);
    const url = 'https://energytalkingpoints.com/';

    for (const document of documents) {
      await PromisePool.for(document)
        .withConcurrency(10)
        .process(async (content) => {
          const embeddingResponse = await openAi.createEmbedding({
            model: 'text-embedding-ada-002',
            input: content,
          });

          const [{ embedding }] = embeddingResponse.data.data;

          await supabaseClient.from('documents').insert({
            content,
            embedding,
            title,
            url,
          });

          console.log({ title, url, content });
        });
    }
  }
}
