import { supabaseClient } from '@/server/supabase';
import { oneLine, stripIndent } from 'common-tags';
import GPT3Tokenizer from 'gpt3-tokenizer';

import { openAi } from '@/config/openai';

export async function searchDocuments(query: string) {
  const input = query.replace(/\n/g, ' ');

  const embeddingResponse = await openAi.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
  });

  const [{ embedding }] = embeddingResponse.data.data;

  const { data: documents, error } = await supabaseClient.rpc(
    'match_documents',
    {
      match_count: 10,
      query_embedding: embedding,
      similarity_threshold: 0.78,
    }
  );

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
  let tokenCount = 0;
  let contextText = '';

  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    const content = document.content;
    const encoded = tokenizer.encode(content);
    tokenCount += encoded.text.length;

    // Limit context to max 1500 tokens (configurable)
    if (tokenCount > 1500) {
      break;
    }

    contextText += `${content.trim()}\n---\n`;
  }

  const prompt = stripIndent`${oneLine`
    You are an objective, energy expert obsessed with human flourishing. Given the following sections from Energy Talking Points,
    answer the question using ONLY that information. If you are unsure and the answer
    is not explicitly written in the provided context sections below, you can say
    "Sorry, I don't know how to help with that."`}

    Context sections:
    ${contextText}

    Question: """
    ${query}
    """

    Answer (in your own words): ""
  `;

  const completionResponse = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 1024, // Choose the max allowed tokens in completion
    temperature: 0, // Set to 0 for deterministic results
  });

  const {
    id,
    choices: [{ text }],
  } = completionResponse.data;

  console.log({ input, id, text });

  if (error) {
    console.error('Error fetching matching documents:', error);
    return null;
  }

  return documents;
}
